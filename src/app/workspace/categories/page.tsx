"use client";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  ConfirmationModal,
  DataTable,
  SuccessModal,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/services/api";
import { formatDate } from "@/helpers";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Nama Kategori", tooltip: "", icon: "" },
  { label: "Deskripsi", tooltip: "", icon: "" },
  { label: "Tanggal Ditambahkan", tooltip: "", icon: "" },
  { label: "Tanggal Terakhir Diubah", tooltip: "", icon: "" },
];

export default function BillOfMaterialsView() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

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
    data: categoryData,
    isLoading,
    error,
  } = useGetCategoriesQuery(filter);
  const [deleteCategory] = useDeleteCategoryMutation();

  const items = useMemo(
    () => categoryData?.data?.categories || [],
    [categoryData?.data?.categories]
  );

  useEffect(() => {
    if (categoryData?.data) {
      const currentData = categoryData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData || 0 });
    }
  }, [categoryData?.data]);

  useEffect(() => {
    const mappedData: any = items.map((item: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            role="button"
            onClick={() =>
              router.push(`/workspace/categories/${item?.id}/edit`)
            }
          ></i>
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => handleDelete(item?.id)}
          ></i>
        </div>
      ),
      "Nama Kategori": item?.name || "N/A",
      Deskripsi: item?.description || "N/A",
      "Tanggal Ditambahkan": formatDate(item?.createdAt, "id-ID") || "N/A",
      "Tanggal Terakhir Diubah": formatDate(item?.updatedAt, "id-ID") || "N/A",
    }));
    setList(mappedData);
  }, [items]);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const _executeDelete = async () => {
    try {
      await deleteCategory(selectedId).unwrap();
      setOpenModal(false);
      setSuccessModal(true);
      setStatusMessage({
        message: "Berhasil Menghapus Kategori!",
        type: "Success",
      });
    } catch (err) {
      setOpenModal(false);
      setSuccessModal(true);
      setStatusMessage({
        message: "Gagal Menghapus Kategori!",
        type: "Error",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error404 />;

  return (
    <Fragment>
      <div className="px-10 pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Master Data Kategori
            </h1>
            <p className="text-base text-gray-600 pb-3">
              Mengelola daftar kategori.
            </p>
          </div>
          <DefaultButton
            type="pill"
            appearance="primary"
            text="Tambah Kategori"
            icon="ki-plus-squared"
            onClick={() => router.push("/workspace/categories/add")}
          />
        </div>
        <DataTable
          title="Informasi Kategori"
          columns={columns}
          data={list}
          filter={filter}
          setFilter={setFilter}
          className="w-full mt-4"
        />
      </div>

      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Konfirmasi"
          message="Yakin ingin menghapus kategori ini?"
          buttonText="Ya, Hapus"
          buttonColor="btn-danger"
          handleClose={() => setOpenModal(false)}
          handleConfirm={_executeDelete}
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
