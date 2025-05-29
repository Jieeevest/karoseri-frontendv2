"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
  TextArea,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import React, { Fragment, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/molecules/Loading";
import { Trash } from "lucide-react";
import { useGetCategoriesQuery, useGetInventoryQuery } from "@/services/api";

const CustomSelect = dynamic(() => import("@/components/atoms/Select"), {
  ssr: false,
  loading: () => <Loading />,
});

// Dummy data
const dummyKaroseri = [
  { label: "Karoseri A", value: "1" },
  { label: "Karoseri B", value: "2" },
];

const dummyInventory = [
  { label: "Kayu Jati", value: "1" },
  { label: "Besi Hollow", value: "2" },
];

interface BOMItemType {
  inventoryId?: {
    label: string;
    value: string;
  } | null;
  quantityPerUnit: string;
}

interface PayloadType {
  name?: string;
  karoseriCategoryId?: {
    label: string;
    value: string;
  } | null;
  description?: string;
  items: BOMItemType[];
}

const filter = {
  keyword: "",
  status: "active",
  pageSize: 5,
  page: 1,
  totalData: 0,
} as {
  keyword: string;
  status: string;
  pageSize: number;
  page: number;
  totalData: number;
};

export default function AddNewBillOfMaterials() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });

  const [payload, setPayload] = useState<PayloadType>({
    name: "",
    karoseriCategoryId: null,
    description: "",
    items: [{ inventoryId: null, quantityPerUnit: "" }],
  });

  const [errors, setErrors] = useState({
    name: "",
    karoseriCategoryId: "",
  });

  const { data: categoryData } = useGetCategoriesQuery(filter);
  const { data: inventoryData } = useGetInventoryQuery(filter);

  const categories = useMemo(
    () => categoryData?.data?.categories || [],
    [categoryData?.data?.categories]
  );

  const inventories = useMemo(
    () => inventoryData?.data?.inventory || [],
    [inventoryData?.data?.inventory]
  );

  const handleChange = (key: keyof PayloadType, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const handleItemChange = (
    index: number,
    key: keyof BOMItemType,
    value: any
  ) => {
    const updatedItems = [...payload.items];
    updatedItems[index][key] = value;
    setPayload((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItemRow = () => {
    setPayload((prev) => ({
      ...prev,
      items: [...prev.items, { inventoryId: null, quantityPerUnit: "" }],
    }));
  };

  const removeItemRow = (index: number) => {
    setPayload((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: payload.name ? "" : "Nama Material wajib diisi.",
      karoseriCategoryId: payload.karoseriCategoryId
        ? ""
        : "Kategori Karoseri wajib dipilih.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setOpenModal(true);
    }
  };

  const _executeSubmit = async () => {
    try {
      // TODO: replace with mutation
      setStatusMessage({
        message: "Penambahan Material berhasil!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/billofmaterials");
    } catch (error) {
      setStatusMessage({
        message: "Gagal menambahkan material.",
        type: "Error",
      });
      setSuccessModal(true);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 pt-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Tambah Bill of Materials
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir penambahan data Material.
              </p>
            </div>
          </div>

          {/* Metadata BoM */}
          <Card
            styleHeader="justify-start"
            contentHeader={
              <div className="flex justify-between w-full items-center">
                <p className="font-semibold">Informasi Umum Material</p>
                <div className="flex gap-2">
                  <DefaultButton
                    type="pill"
                    appearance="light"
                    text="Kembali"
                    onClick={() => router.back()}
                  />
                  <DefaultButton
                    type="pill"
                    appearance="primary"
                    text="Simpan"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            }
            styleFooter="justify-end"
          >
            <div className="flex flex-col gap-4 my-4">
              <InputText
                label="Nama Material"
                placeholder="Contoh: Rangka Bus A"
                required
                className="w-full"
                value={payload.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
              <CustomSelect
                label="Kategori Karoseri"
                required={true}
                optionValue={categories?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
                size="sm"
                value={payload.karoseriCategoryId}
                onChange={(e) => handleChange("karoseriCategoryId", e)}
                error={errors.karoseriCategoryId}
              />
              <TextArea
                label="Keterangan"
                placeholder="Tambahkan deskripsi (opsional)"
                className="w-full"
                onChange={(e) => handleChange("description", e.target.value)}
                value={payload.description}
              />
            </div>
          </Card>

          {/* Tabel Item BoM */}
          <Card
            styleHeader="justify-start"
            contentHeader={<p className="font-semibold">Item Material</p>}
            styleFooter="justify-end"
            contentFooter={
              <DefaultButton
                text="Tambah Item"
                appearance="primary"
                onClick={addItemRow}
              />
            }
          >
            <div className="space-y-4 my-4">
              {payload.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 items-center gap-4"
                >
                  <div className="col-span-6">
                    <CustomSelect
                      label={`Item ${index + 1}`}
                      required={true}
                      optionValue={inventories?.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      value={item.inventoryId}
                      size="sm"
                      onChange={(e) =>
                        handleItemChange(index, "inventoryId", e)
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <InputText
                      label="Jumlah per Unit"
                      required
                      type="number"
                      value={item.quantityPerUnit}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantityPerUnit",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <DefaultButton
                      text={<Trash className="w-5 h-5" />}
                      appearance="danger"
                      onClick={() => removeItemRow(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          handleClose={() => setOpenModal(false)}
          handleConfirm={_executeSubmit}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage.type}
          message={statusMessage.message}
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </Fragment>
  );
}
