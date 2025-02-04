"use client";

import {
  Badge,
  ConfirmationModal,
  DataTable,
  SuccessModal,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import { formatDate } from "@/helpers";
import { useDeleteMenuMutation, useGetMenusQuery } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Menu Name", tooltip: "", icon: "" },
  { label: "Status", tooltip: "", icon: "" },
  { label: "Category", tooltip: "", icon: "" },
  { label: "Added Date", tooltip: "", icon: "" },
  { label: "Last Updated", tooltip: "", icon: "" },
];
export default function MenuOverview() {
  const router = useRouter();
  const [menuList, setMenuList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [filter, setFilter] = useState({
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
  });
  const { data: menuData, error, isLoading } = useGetMenusQuery(filter);
  const [deleteMenu] = useDeleteMenuMutation();

  const menus = useMemo(
    () => menuData?.data?.menu || [],
    [menuData?.data?.menu]
  );

  useEffect(() => {
    const mappedData: any = menus.map((menu: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500"
            onClick={() => router.push(`/workspace/menu/${menu?.id}/edit`)}
          ></i>
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500"
            onClick={() => handleDelete(menu.id)}
          ></i>
        </div>
      ),
      "Menu Name": menu?.name || "N/A",
      Status:
        menu?.status == "active" ? (
          <Badge appearance="success" text="Active" type="outline" />
        ) : menu?.status == "pending" ? (
          <Badge appearance="warning" text="Pending" type="outline" />
        ) : (
          <Badge appearance="danger" text="Inactive" type="outline" />
        ),
      Category: menu?.category || "N/A",
      "Added Date": formatDate(menu?.createdAt) || "N/A",
      "Last Updated": formatDate(menu?.updatedAt) || "N/A",
    }));
    setMenuList(mappedData);
  }, [menuData]);

  const handleDelete = async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const _executeDelete = async () => {
    try {
      await deleteMenu(selectedId).unwrap();
      setStatusMessage({
        message: "Menu deleted successfully!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
      setTimeout(() => {
        router.push("/workspace/menu");
      }, 3000);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Error deleting menu",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Error deleting menu:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error404 />;

  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Menu Overview</h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Manage menu access description.
            </p>
          </div>
          <div className="space-x-2">
            <DefaultButton
              type="pill"
              appearance="dark"
              text="View Logs"
              icon="ki-archive-tick"
            />
            <DefaultButton
              type="pill"
              appearance="primary"
              text="Add New Menu"
              icon="ki-plus-squared"
              onClick={() => router.push(`/workspace/menu/add`)}
            />
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full">
          <DataTable
            title="Menu List"
            columns={columns}
            data={menuList}
            filter={filter}
            setFilter={setFilter}
            className="w-full"
          />
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Confirmation"
          message="Are you sure you want to delete this menu?"
          buttonText="Confirm"
          buttonColor="btn-danger"
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeDelete()}
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
