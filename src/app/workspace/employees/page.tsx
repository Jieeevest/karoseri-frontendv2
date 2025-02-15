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
  EmployeeData,
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "@/services/api";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";

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
  const { data: employeeData, error, isLoading } = useGetEmployeesQuery(filter);
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
    const mappedData: any = employees.map((employee: EmployeeData) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          {employee?.id == 1 && (
            <>
              <i
                className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
                role="button"
                onClick={() =>
                  router.push(`/workspace/employees/${employee?.id}/edit`)
                }
              ></i>
              <i
                className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
                onClick={() => handleDelete(employee?.id)}
              ></i>
            </>
          )}
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
          <Badge appearance="success" text="Active" type="outline" />
        ) : employee?.status === "pending" ? (
          <Badge appearance="warning" text="Pending" type="outline" />
        ) : (
          <Badge appearance="danger" text="Inactive" type="outline" />
        ),
    }));

    setEmployeeList(mappedData);
  }, [employees]);

  const handleDelete = async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const _executeDelete = async () => {
    try {
      await deleteEmployee(selectedId).unwrap();
      setStatusMessage({
        message: "Employee deleted successfully!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
      setTimeout(() => {
        router.push("/workspace/employees");
      }, 3000);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Error deleting employee",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Error deleting employee:", error);
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
              Master Data Karyawan
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Fitur untuk mengelola karyawan.
            </p>
          </div>
          <div className="space-x-2">
            <DefaultButton
              type="pill"
              appearance="dark"
              text="Riwayat Perubahan"
              icon="ki-archive-tick"
            />
            <DefaultButton
              type="pill"
              appearance="primary"
              text="Tambah Karyawan"
              icon="ki-plus-squared"
              className="cursor-pointer"
              onClick={() => router.push("/workspace/employees/add")}
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
          />
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Confirmation"
          message="Are you sure you want to delete this employee?"
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
