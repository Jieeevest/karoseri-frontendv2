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
  useDeleteLocationMutation,
  useGetLocationsQuery,
} from "@/services/api";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useMemo, useState } from "react";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Nama Lokasi", tooltip: "", icon: "" },
  { label: "Deskripsi", tooltip: "", icon: "" },
  { label: "Tanggal Ditambahkan", tooltip: "", icon: "" },
  { label: "Tanggal Terakhir Diubah", tooltip: "", icon: "" },
];

export default function GroupOverview() {
  const router = useRouter();
  const [locationList, setLocationList] = useState([]);
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
  const { data: locationData, error, isLoading } = useGetLocationsQuery(filter);
  const [deleteLocation] = useDeleteLocationMutation();

  const locations = useMemo(
    () => locationData?.data?.locations || [],
    [locationData?.data?.locations]
  );

  useEffect(() => {
    if (locationData?.data) {
      const currentData = locationData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData || 0 });
    }
  }, [locationData?.data]);

  useEffect(() => {
    const mappedData: any = locations.map((item: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            role="button"
            onClick={() => router.push(`/workspace/locations/${item?.id}/edit`)}
          ></i>
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => handleDelete(item?.id)}
          ></i>
        </div>
      ),
      "Nama Lokasi": item?.name || "N/A",
      Deskripsi: item?.description || "N/A",
      "Tanggal Ditambahkan": formatDate(item?.createdAt) || "N/A",
      "Tanggal Terakhir Diubah": formatDate(item?.updatedAt) || "N/A",
    }));
    setLocationList(mappedData);
  }, [locations]);

  const handleDelete = async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const _executeDelete = async () => {
    try {
      await deleteLocation(selectedId).unwrap();
      setStatusMessage({
        message: "Location deleted successfully!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
      setTimeout(() => {
        router.push("/workspace/locations");
      }, 3000);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Error deleting location",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Error deleting location:", error);
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
              Master Data Lokasi Penyimpanan
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Fitur untuk mengelola lokasi penyimpanan.
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
              text="Tambah Lokasi Penyimpanan"
              icon="ki-plus-squared"
              className="cursor-pointer"
              onClick={() => router.push("/workspace/locations/add")}
            />
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full">
          <DataTable
            title="Pustaka Lokasi Penyimpanan"
            columns={columns}
            data={locationList}
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
          message="Are you sure you want to delete this location?"
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
