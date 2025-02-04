"use client";
import {
  Card,
  ConfirmationModal,
  InputCheckbox,
  InputFile,
  InputText,
  SuccessModal,
  Switch,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import {
  useGetMenusQuery,
  useGetPackageByIdQuery,
  useUpdatePackageMutation,
} from "@/services/api";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";

interface PayloadType {
  name: string;
  description: string;
  imageUrl: string;
  selectedMenu: number[];
}

export default function EditPackage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("id");
  const [menuList, setMenuList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState<PayloadType>({
    name: "",
    description: "",
    imageUrl: "",
    selectedMenu: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    imageUrl: "",
    selectedMenu: "",
  });

  const filter = {
    keyword: "",
    status: "active",
    pageSize: 20,
    page: 1,
    totalData: 0,
  } as {
    keyword: string;
    status: string;
    pageSize: number;
    page: number;
    totalData: number;
  };

  const [updatePackage] = useUpdatePackageMutation();
  const {
    data: packageData,
    error,
    isLoading,
  } = useGetPackageByIdQuery(packageId ? parseInt(packageId) : 1);

  const packages: any = useMemo(
    () => packageData?.data || [],
    [packageData?.data, packageId]
  );

  const { data: menuData } = useGetMenusQuery(filter);

  const menus = useMemo(
    () => menuData?.data?.menu || [],
    [menuData?.data?.menu]
  );

  useEffect(() => {
    if (packages) {
      setPayload({
        ...payload,
        name: packages?.name,
        description: packages?.description,
        imageUrl: packages?.imageUrl,
        selectedMenu: packages?.selectedMenu,
      });
    }
  }, [packages, packageId]);

  useEffect(() => {
    const mappedData: any = menus.map((menu) => ({
      "Menu Name": (
        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              {menu.category == "Backoffice" ? (
                <Image
                  src="/siap-logo-new.png"
                  alt="logo"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/siap-payment-new.png"
                  alt="logo"
                  width={20}
                  height={20}
                />
              )}
            </div>
            <div className="text-left">
              <p className="font-bold">{menu.name}</p>
              <p className="font-light">{menu.category}</p>
            </div>
          </div>
          <div>
            <Switch
              checked={payload?.selectedMenu?.includes(menu?.id) || false}
              onChange={() => toggleMenuSelection(menu?.id)}
            />
          </div>
        </div>
      ),
    }));
    setMenuList(mappedData);
  }, [menus, payload]);

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    return setPayload({
      ...payload,
      [key]: value,
    });
  };

  const toggleMenuSelection = (menuId: number) => {
    setPayload((prev) => {
      const newSelectedMenu = prev.selectedMenu.includes(menuId)
        ? prev.selectedMenu.filter((id) => id !== menuId)
        : [...prev.selectedMenu, menuId];

      if (newSelectedMenu.length > 0) {
        setErrors((prev) => ({ ...prev, ["selectedMenu"]: "" }));
      }

      return {
        ...prev,
        selectedMenu: newSelectedMenu,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: payload.name ? "" : "Package Name is required.",
      description: payload.description ? "" : "Description is required.",
      imageUrl: payload.imageUrl ? "" : "Package Image is required.",
      selectedMenu:
        payload.selectedMenu.length > 0
          ? ""
          : "At least one menu must be selected.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setOpenModal(true);
    }
  };

  const _executeSubmit = async () => {
    setLoading(true);
    try {
      await updatePackage({
        id: packageId ? parseInt(packageId) : 1,
        updates: payload,
      }).unwrap();
      setStatusMessage({
        message: "Package updated successfully!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
      setTimeout(() => {
        router.push("/workspace/packages");
      }, 3000);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Error updating package",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Error updating package:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || isLoading) return <Loading />;
  if (error) return <Error404 />;
  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Edit Information Packages
            </h1>
            <p className="text-base text-gray-600 px-0.5  pb-3">
              Edit information packages description.
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-1">
        <div className="flex max-w-full min-w-fit">
          <Card
            styleHeader={"justify-start"}
            contentHeader={
              <p className="font-semibold">Packages Information</p>
            }
            styleFooter={"justify-end"}
            contentFooter={
              <div className="flex justify-end gap-2 ">
                <DefaultButton
                  type="pill"
                  appearance="light"
                  text="Cancel"
                  onClick={() => router.back()}
                />
                <DefaultButton
                  type="pill"
                  appearance="primary"
                  text="Update"
                  onClick={() => handleSubmit()}
                />
              </div>
            }
          >
            <div className="w-[1200px] space-y-4 my-4">
              <InputText
                type="text"
                label="Package Name"
                required={true}
                placeholder="Package Name"
                className="w-[600px]"
                value={payload?.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name || ""}
              />
              <InputText
                type="text"
                label="Description"
                required={true}
                placeholder="Description"
                className="w-[600px]"
                value={payload?.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={errors.description || ""}
              />
              <div className={`relative w-[600px]`}>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label max-w-44"
                    htmlFor={"Package Image"}
                  >
                    {"Package Image"}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="relative w-full">
                    <InputFile />
                    {payload.imageUrl ? (
                      <p className="text-xs text-gray-700 mt-1">
                        {payload.imageUrl}
                      </p>
                    ) : null}

                    {errors.imageUrl && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.imageUrl}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-44">
                  Selected Menu
                  <span className="text-danger">*</span>
                </label>
                <div
                  data-datatable="true"
                  data-datatable-page-size="5"
                  data-datatable-state-save="true"
                  id="datatable_1"
                >
                  <div className="scrollable-x-auto border rounded-lg  w-[600px]">
                    <table
                      className="table table-auto"
                      data-datatable-table="true"
                    >
                      <tbody>
                        {menuList.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="p-4 border-[1px] rounded-lg"
                          >
                            <td className="text-center">{row["Menu Name"]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {errors.selectedMenu && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.selectedMenu}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          message="Are you sure you want to update this package?"
          buttonText="Update"
          showModal={openModal}
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeSubmit()}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage?.type}
          message={statusMessage?.message}
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </Fragment>
  );
}
