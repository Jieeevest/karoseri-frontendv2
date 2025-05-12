"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Badge,
  ConfirmationModal,
  DataTable,
  SuccessModal,
  Button,
} from "@/components/atoms";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import {
  EmployeeData,
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "@/services/api";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "NIK", tooltip: "", icon: "" },
  { label: "Nama Karyawan", tooltip: "", icon: "" },
  { label: "Jenis Kelamin", tooltip: "", icon: "" },
  { label: "Usia", tooltip: "", icon: "" },
  { label: "No Telepon", tooltip: "", icon: "" },
  { label: "Email", tooltip: "", icon: "" },
  { label: "Role", tooltip: "", icon: "" },
  { label: "Status", tooltip: "", icon: "" },
];

export default function EmployeesOverview() {
  const router = useRouter();
  const [employeeList, setEmployeeList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
    data: employeeData,
    error,
    isLoading,
    refetch,
  } = useGetEmployeesQuery(filter);
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const employees = useMemo(
    () => employeeData?.data?.employees || [],
    [employeeData?.data?.employees]
  );

  useEffect(() => {
    if (employeeData?.data) {
      const currentData = employeeData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData || 0 });
    }
  }, [employeeData?.data?.employees]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const mappedData: any = employees.map((employee: EmployeeData) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          {/* {employee?.role?.id == 1 && ( */}
          <>
            <i
              className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
              role="button"
              onClick={() => {
                setLoading(true);
                router.push(`/workspace/employees/${employee?.id}/edit`);
              }}
            ></i>
            <i
              className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => handleDelete(employee?.id)}
            ></i>
          </>
          {/* )} */}
        </div>
      ),
      NIK: employee?.nik || "-",
      "Nama Karyawan": employee?.fullName || "-",
      "Jenis Kelamin": employee?.gender || "-",
      Usia: employee?.birthDate
        ? Math.floor(
            (new Date().getTime() - new Date(employee?.birthDate).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25)
          )
        : "-",
      "No Telepon": employee?.phoneNumber || "-",
      Email: employee?.email || "-",
      Role: employee?.role?.name || "-",
      Status:
        employee?.status === "active" ? (
          <Badge appearance="success" text="Aktif" type="outline" />
        ) : employee?.status === "pending" ? (
          <Badge appearance="warning" text="Pending" type="outline" />
        ) : (
          <Badge appearance="danger" text="Tidak Aktif" type="outline" />
        ),
    }));

    setEmployeeList(mappedData);
  }, [employees, refetch]);

  const handleDelete = async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const _executeDelete = async () => {
    setLoading(true);
    try {
      await deleteEmployee(selectedId)
        .unwrap()
        .then(() => {
          refetch();
          setLoading(false);
          setStatusMessage({
            message: "Gagal menghapus karyawan!",
            type: "Success",
          });
          setOpenModal(false);
          setSuccessModal(true);
        });
    } catch (error) {
      refetch();
      setLoading(false);
      setOpenModal(false);
      setStatusMessage({
        message: "Gagal menghapus karyawan",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menghapus karyawan:", error);
    }
  };

  if (isLoading || loading) return <Loading />;
  if (error) return <Error404 />;

  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Master Data Karyawan
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Fitur untuk mengelola karyawan.
            </p>
          </div>
          <div className="space-x-2">
            {/* <Button
              type="pill"
              appearance="dark"
              text="Riwayat Perubahan"
              icon="ki-archive-tick"
              isDisabled={true}
            /> */}
            <Button
              type="pill"
              appearance="primary"
              text="Tambah Karyawan"
              icon="ki-plus-squared"
              className="cursor-pointer"
              onClick={() => {
                setLoading(true);
                router.push("/workspace/employees/add");
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full">
          <DataTable
            title="Pustaka Karyawan"
            columns={columns}
            data={employeeList}
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
          title="Konfirmasi Hapus Karyawan"
          message="Apakah anda yakin ingin menghapus data karyawan ini?"
          buttonText="Ya, Hapus"
          buttonColor="btn-danger"
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeDelete()}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage?.type == "Success" ? "Sukses" : "Gagal"}
          message={statusMessage?.message}
          handleClose={() => {
            setSuccessModal(false);
            router.push("/workspace/employees");
          }}
        />
      )}
    </Fragment>
  );
}
