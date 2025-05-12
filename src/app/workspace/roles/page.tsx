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
import { useDeleteRoleMutation, useGetRolesQuery } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Nama Role", tooltip: "", icon: "" },
  { label: "Deskripsi", tooltip: "", icon: "" },
  { label: "Status", tooltip: "", icon: "" },
  { label: "Tanggal Ditambahkan", tooltip: "", icon: "" },
  { label: "Tanggal Terakhir Diubah", tooltip: "", icon: "" },
];

export default function RolesOverview() {
  const router = useRouter();
  const [roleList, setRoleList] = useState([]);
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
  const { data: roleData, error, isLoading } = useGetRolesQuery(filter);
  const [deleteRole] = useDeleteRoleMutation();

  const roles = useMemo(
    () => roleData?.data?.roles || [],
    [roleData?.data?.roles]
  );

  useEffect(() => {
    if (roleData?.data) {
      const currentData = roleData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData || 0 });
    }
  }, [roleData?.data]);

  useEffect(() => {
    const mappedData: any = roles.map((role: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            role="button"
            onClick={() => router.push(`/workspace/roles/${role?.id}/edit`)}
          ></i>
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => handleDelete(role?.id)}
          ></i>
        </div>
      ),
      "Nama Role": role?.name ?? "N/A",
      Deskripsi: role?.description ?? "N/A",
      Status:
        role?.status == "active" ? (
          <Badge appearance="success" text="Aktif" type="outline" />
        ) : role?.status == "pending" ? (
          <Badge appearance="warning" text="Pending" type="outline" />
        ) : (
          <Badge appearance="danger" text="Tidak Aktif" type="outline" />
        ),
      "Tanggal Ditambahkan": formatDate(role?.createdAt, "id-ID") ?? "N/A",
      "Tanggal Terakhir Diubah": formatDate(role?.updatedAt, "id-ID") ?? "N/A",
    }));
    setRoleList(mappedData);
  }, [roles]);

  const handleDelete = async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const _executeDelete = async () => {
    try {
      await deleteRole(selectedId).unwrap();
      setStatusMessage({
        message: "Package deleted successfully!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Error deleting package",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Error deleting package:", error);
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
              Master Data Role Akses
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Fitur untuk mengelola role akses.
            </p>
          </div>
          <div className="space-x-2">
            {/* <DefaultButton
              type="pill"
              appearance="dark"
              text="Riwayat Perubahan"
              icon="ki-archive-tick"
            /> */}
            <DefaultButton
              type="pill"
              appearance="primary"
              text="Tambah Role Akses"
              icon="ki-plus-squared"
              className="cursor-pointer"
              onClick={() => router.push("/workspace/roles/add")}
            />
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full">
          <DataTable
            title="Pustaka Role Akses"
            columns={columns}
            data={roleList}
            filter={filter}
            setFilter={setFilter}
            className="w-full"
            pageSizeOptions={[5, 10, 25, 50, 100]}
          />
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Konfirmasi Hapus Role Akses"
          message="Apakah anda yakin ingin menghapus role akses ini?"
          buttonText="Ya, Hapus"
          buttonColor="btn-danger"
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeDelete()}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage?.type == "success" ? "Sukses" : "Gagal"}
          message={statusMessage?.message}
          handleClose={() => {
            setSuccessModal(false);
            setTimeout(() => {
              router.push("/workspace/roles");
            }, 3000);
          }}
        />
      )}
    </Fragment>
  );
}
