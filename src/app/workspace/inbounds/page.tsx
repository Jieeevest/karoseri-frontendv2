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
  { label: "Role Name", tooltip: "", icon: "" },
  { label: "Description", tooltip: "", icon: "" },
  { label: "Status", tooltip: "", icon: "" },
  { label: "Authorized Menu", tooltip: "", icon: "" },
  { label: "Added Date", tooltip: "", icon: "" },
  { label: "Last Updated", tooltip: "", icon: "" },
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
      "Role Name": role?.name || "N/A",
      Description: role?.description || "N/A",
      Status:
        role?.status == "active" ? (
          <Badge appearance="success" text="Active" type="outline" />
        ) : role?.status == "pending" ? (
          <Badge appearance="warning" text="Pending" type="outline" />
        ) : (
          <Badge appearance="danger" text="Inactive" type="outline" />
        ),
      "Authorized Menu": role?.menu || "N/A",
      "Added Date": formatDate(role?.createdAt) || "N/A",
      "Last Updated": formatDate(role?.updatedAt) || "N/A",
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
      setTimeout(() => {
        router.push("/workspace/packages");
      }, 3000);
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
            <h1 className="text-2xl font-bold text-gray-800">Roles Overview</h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Manage role access description.
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
              text="Add New Role"
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
            title="Role List"
            columns={columns}
            data={roleList}
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
          message="Are you sure you want to delete this package?"
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
