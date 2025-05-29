"use client";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { ConfirmationModal, DataTable, SuccessModal } from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import {
  useDeleteBillOfMaterialMutation,
  useGetBillOfMaterialsQuery,
} from "@/services/api";
import { useRouter } from "next/navigation";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Tanggal Kedatangan", tooltip: "", icon: "" },
  { label: "Nomor Pengiriman", tooltip: "", icon: "" },
  { label: "Nama Supplier", tooltip: "", icon: "" },
  { label: "Pengirim", tooltip: "", icon: "" },
  { label: "Penerima", tooltip: "", icon: "" },
  { label: "Tanggal Ditambahkan", tooltip: "", icon: "" },
  { label: "Tanggal Diubah", tooltip: "", icon: "" },
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
    data: billOfMaterialsData,
    isLoading,
    error,
  } = useGetBillOfMaterialsQuery(filter);
  const [deleteBillOfMaterials] = useDeleteBillOfMaterialMutation();

  const items = useMemo(
    () => billOfMaterialsData?.data?.billOfMaterials || [],
    [billOfMaterialsData?.data?.billOfMaterials]
  );

  useEffect(() => {
    if (billOfMaterialsData?.data) {
      const currentData = billOfMaterialsData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData || 0 });
    }
  }, [billOfMaterialsData?.data]);

  useEffect(() => {
    const mappedData: any = items?.map((item: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300"
            onClick={() =>
              router.push(`/workspace/billofmaterials/${item?.id}/edit`)
            }
          />
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ),
      "Tanggal Kedatangan": item?.incomingDate || "-",
      "Nomor Pengiriman": item?.deliveryNumber || "-",
      "Nama Supplier": item?.supplierName || "-",
      Pengirim: item?.submitter || "-",
      Penerima: item?.receiver,
      "Tanggal Ditambahkan": item?.createdAt,
      "Tanggal Diubah": item?.updatedAt,
    }));

    setList(mappedData);
  }, [items]);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const _executeDelete = async () => {
    try {
      await deleteBillOfMaterials(selectedId).unwrap();
      setOpenModal(false);
      setSuccessModal(true);
      setStatusMessage({
        message: "Berhasil Menghapus Bill of Materials !",
        type: "Success",
      });
    } catch (err) {
      setOpenModal(false);
      setSuccessModal(true);
      setStatusMessage({
        message: "Gagal Menghapus Bill of Materials!",
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
              Master Data Bill of Materials
            </h1>
            <p className="text-base text-gray-600 pb-3">
              Mengelola daftar bill of materials.
            </p>
          </div>
          <DefaultButton
            type="pill"
            appearance="primary"
            text="Tambah Material"
            icon="ki-plus-squared"
            onClick={() => router.push("/workspace/billofmaterials/add")}
          />
        </div>
        <DataTable
          title="Informasi Bill of Materials"
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
          message="Yakin ingin menghapus material ini?"
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
