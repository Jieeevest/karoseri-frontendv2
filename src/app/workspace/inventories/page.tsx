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
import {
  useDeleteInventoryMutation,
  useGetInventoryQuery,
} from "@/services/api";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Nama Barang", tooltip: "", icon: "" },
  { label: "Suplier", tooltip: "", icon: "" },
  { label: "Lokasi", tooltip: "", icon: "" },
  { label: "Jumlah Stok", tooltip: "", icon: "" },
  { label: "Stok Minimum", tooltip: "", icon: "" },
  { label: "Tanggal Ditambahkan", tooltip: "", icon: "" },
  { label: "Tanggal Diubah", tooltip: "", icon: "" },
];

export default function InventoryOverview() {
  const router = useRouter();
  const [inventoryList, setInventoryList] = useState([]);
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

  const {
    data: inventoryData,
    error,
    isLoading,
  } = useGetInventoryQuery(filter);
  const [deleteInventory] = useDeleteInventoryMutation();

  const inventory = useMemo(
    () => inventoryData?.data?.inventory || [],
    [inventoryData?.data?.inventory]
  );

  useEffect(() => {
    if (inventoryData?.data) {
      const currentData = inventoryData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData || 0 });
    }
  }, [inventoryData?.data]);

  useEffect(() => {
    const mappedData: any = inventory.map((item: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            role="button"
            onClick={() =>
              router.push(`/workspace/inventories/${item?.id}/edit`)
            }
          ></i>
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => handleDelete(item?.id)}
          ></i>
        </div>
      ),
      "Nama Barang": item?.name || "N/A",
      Suplier: item?.supplier?.name || "N/A",
      Lokasi: item?.location?.name || "N/A",
      "Jumlah Stok": item?.amount || "N/A",
      "Stok Minimum": item?.minimumStock || "N/A",
      "Tanggal Ditambahkan": formatDate(item?.createdAt, "id-ID") || "N/A",
      "Tanggal Diubah": formatDate(item?.updatedAt, "id-ID") || "N/A",
    }));
    setInventoryList(mappedData);
  }, [inventory]);

  const handleDelete = async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const _executeDelete = async () => {
    try {
      await deleteInventory(selectedId).unwrap();
      setStatusMessage({
        message: "Berhasil menghapus item!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
      setTimeout(() => {
        router.push("/workspace/inventories");
      }, 3000);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Gagal menghapus item",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menghapus item:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error404 />;

  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Master Data Inventaris
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Fitur untuk mengelola inventaris.
            </p>
          </div>
          <div className="space-x-2">
            <DefaultButton
              type="pill"
              appearance="primary"
              text="Tambah Barang"
              icon="ki-plus-squared"
              className="cursor-pointer"
              onClick={() => router.push("/workspace/inventories/add")}
            />
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full">
          <DataTable
            title="Informasi Inventaris"
            columns={columns}
            data={inventoryList}
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
          message="Are you sure you want to delete this inventory item?"
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
