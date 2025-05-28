"use client";
import { ConfirmationModal, DataTable, SuccessModal } from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import { useDeleteVehicleMutation, useGetVehiclesQuery } from "@/services/api";
import { useRouter } from "next/navigation";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const columns = [
  { label: "", tooltip: "", icon: "" },
  { label: "Nama Showroom", tooltip: "", icon: "" },
  { label: "Nama Pemilik", tooltip: "", icon: "" },
  { label: "Nama Ekspedisi", tooltip: "", icon: "" },
  { label: "Merk", tooltip: "", icon: "" },
  { label: "Seri Kendaraan", tooltip: "", icon: "" },
  { label: "Warna", tooltip: "", icon: "" },
  { label: "Tipe Kendaraan", tooltip: "", icon: "" },
  { label: "Nomor Chasis", tooltip: "", icon: "" },
  { label: "Nomor Mesin", tooltip: "", icon: "" },
  { label: "Deskripsi", tooltip: "", icon: "" },
];

const CURRENT_CHECKPOINT_URL = `/workspace/categories`;

export default function GroupOverview() {
  const router = useRouter();
  const [groupList, setGroupList] = useState([]);
  const [loading, setLoading] = useState(false);
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
    data: vehicleData,
    error,
    isLoading,
    refetch,
  } = useGetVehiclesQuery(filter);
  const [deleteVehicle] = useDeleteVehicleMutation();

  const vehicles = useMemo(
    () => vehicleData?.data?.vehicles ?? [],
    [vehicleData?.data?.vehicles]
  );

  const redirectUrl = useCallback(
    (additionalUrl: string) => {
      setLoading(true);
      router.prefetch(CURRENT_CHECKPOINT_URL + additionalUrl);
      return router.push(CURRENT_CHECKPOINT_URL + additionalUrl);
    },
    [router]
  );

  useEffect(() => {
    if (vehicleData?.data) {
      const currentData = vehicleData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData ?? 0 });
    }
  }, [vehicleData?.data]);

  useEffect(() => {
    const mappedData: any = vehicles.map((item: any) => ({
      "": (
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            role="button"
            onClick={() => redirectUrl(`/${item?.id}/edit`)}
          ></i>
          <i
            className="text-2xl bg-slate-100 rounded-md ki-outline ki-trash hover:text-slate-500 hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => handleDelete(item?.id)}
          ></i>
        </div>
      ),
      "Nama Showroom": item?.showroomName ?? "N/A",
      "Nama Pemilik": item?.ownerName ?? "N/A",
      "Nama Ekspedisi": item?.expeditionName ?? "N/A",
      Merk: item?.merk ?? "N/A",
      "Seri Kendaraan": item?.series ?? "N/A",
      Warna: item?.color ?? "N/A",
      "Tipe Kendaraan": item?.type ?? "N/A",
      "Nomor Chasis": item?.chasisNumber ?? "N/A",
      "Nomor Mesin": item?.machineNumber ?? "N/A",
      Deskripsi: item?.description ?? "N/A",
    }));
    setGroupList(mappedData);
  }, [vehicles]);

  const handleDelete = useCallback(async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  }, []);

  const _executeDelete = async () => {
    try {
      await deleteVehicle(selectedId).unwrap();
      setStatusMessage({
        message: "Hapus Jenis Karoseri Berhasil!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Gagal Menghapus Jenis Karoseri",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal Menghapus Jenis Karoseri:", error);
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
              Master Data Jenis Karoseri
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Fitur untuk mengelola jenis karoseri.
            </p>
          </div>
          <div className="space-x-2">
            <DefaultButton
              type="pill"
              appearance="primary"
              text="Tambah Jenis"
              icon="ki-plus-squared"
              className="cursor-pointer"
              onClick={() => redirectUrl("/add")}
            />
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full">
          <DataTable
            title="Pustaka Kendaraan"
            columns={columns}
            data={groupList}
            filter={filter}
            setFilter={setFilter}
            className="w-full"
          />
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Konfirmasi"
          message="Apakah anda yakin ingin menghapus data kendaraan ini?"
          buttonText="Ya, Hapus"
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
          handleClose={() => {
            setSuccessModal(false);
            refetch();
          }}
        />
      )}
    </Fragment>
  );
}
