"use client";
import { ConfirmationModal, DataTable, SuccessModal } from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import { useDeleteInboundMutation, useGetOutboundsQuery } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Tanggal Pengiriman", tooltip: "", icon: "" },
  { label: "Nomor Pengiriman", tooltip: "", icon: "" },
  { label: "Nama Supplier", tooltip: "", icon: "" },
  { label: "Submitter", tooltip: "", icon: "" },
  { label: "Approver", tooltip: "", icon: "" },
  { label: "Tanggal Ditambahkan", tooltip: "", icon: "" },
  { label: "Tanggal Diubah", tooltip: "", icon: "" },
];

export default function OutboundsOverview() {
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

  const { data: outboundData, isLoading, error } = useGetOutboundsQuery(filter);
  const [deleteOutbound] = useDeleteInboundMutation();

  const items = useMemo(
    () => outboundData?.data?.inbounds || [],
    [outboundData?.data?.requests]
  );

  useEffect(() => {
    if (outboundData?.data) {
      const currentData = outboundData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData || 0 });
    }
  }, [outboundData?.data]);

  useEffect(() => {
    const mappedData: any = items?.map((item: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300"
            onClick={() => router.push(`/workspace/outbounds/${item?.id}/edit`)}
          />
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ),
      "Tanggal Pengiriman": item?.outcomingDate || "-",
      "Nomor Pengiriman": item?.deliveryNumber || "-",
      "Nama Supplier": item?.supplierName || "-",
      Submitter: item?.submitter || "-",
      Approver: item?.receiver,
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
      await deleteOutbound(selectedId).unwrap();
      setOpenModal(false);
      setSuccessModal(true);
      setStatusMessage({
        message: "Berhasil menghapus item!",
        type: "Success",
      });
    } catch (err) {
      setOpenModal(false);
      setSuccessModal(true);
      setStatusMessage({ message: "Gagal menghapus item!", type: "Error" });
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
              Manajemen Barang Keluar
            </h1>
            <p className="text-base text-gray-600 pb-3">
              Mengelola daftar barang keluar.
            </p>
          </div>
          <DefaultButton
            type="pill"
            appearance="primary"
            text="Tambah Barang Keluar"
            icon="ki-plus-squared"
            onClick={() => router.push("/workspace/outbounds/add")}
          />
        </div>
        <DataTable
          title="Informasi Barang Keluar"
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
          message="Yakin ingin menghapus item ini?"
          buttonText="Hapus"
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
