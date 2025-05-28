"use client";
import { ConfirmationModal, DataTable, SuccessModal } from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import {
  useDeleteSupplierMutation,
  useGetSuppliersQuery,
} from "@/services/api";
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
  { label: "Nama Suplier", tooltip: "", icon: "" },
  { label: "Kategori", tooltip: "", icon: "" },
  { label: "No. Rekening", tooltip: "", icon: "" },
  { label: "Email", tooltip: "", icon: "" },
  { label: "Telp", tooltip: "", icon: "" },
  { label: "Total Piutang", tooltip: "", icon: "" },
];

const CURRENT_CHECKPOINT_URL = `/workspace/suppliers`;

export default function SuppliersOverview() {
  const router = useRouter();
  const [supplierList, setSupplierList] = useState([]);
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
    data: supplierData,
    error,
    isLoading,
    refetch,
  } = useGetSuppliersQuery(filter);
  const [deleteSupplier] = useDeleteSupplierMutation();

  const suppliers = useMemo(
    () => supplierData?.data?.suppliers ?? [],
    [supplierData?.data?.suppliers]
  );

  useEffect(() => {
    if (supplierData?.data) {
      const currentData = supplierData?.data;
      setFilter({ ...filter, totalData: currentData?.totalData ?? 0 });
    }
  }, [supplierData?.data]);

  const redirectUrl = useCallback(
    (additionalUrl: string) => {
      setLoading(true);
      router.prefetch(CURRENT_CHECKPOINT_URL + additionalUrl);
      return router.push(CURRENT_CHECKPOINT_URL + additionalUrl);
    },
    [router]
  );

  useEffect(() => {
    const mappedData: any = suppliers.map((item: any) => ({
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
      "Nama Suplier": item?.name ?? "N/A",
      Kategori: item?.category ? String(item?.category).toUpperCase() : "N/A",
      "No. Rekening":
        `${String(item?.bank).toUpperCase()} ${item?.bankNumber} - ${
          item?.bankOwner
        }` || "N/A",
      Email: item?.email ?? "N/A",
      Telp: item?.phoneNumber ?? "N/A",
      "Total Piutang": "Rp. " + (item?.debt ?? "0") + ",-",
    }));
    setSupplierList(mappedData);
  }, [suppliers]);

  const handleDelete = async (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const _executeDelete = async () => {
    try {
      await deleteSupplier(selectedId).unwrap();
      setStatusMessage({
        message: "Hapus supplier berhasil!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Gagal menghapus supplier",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menghapus supplier:", error);
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
              Master Data Suplier
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Fitur untuk mengelola suplier.
            </p>
          </div>
          <div className="space-x-2">
            <DefaultButton
              type="pill"
              appearance="primary"
              text="Tambah Suplier"
              icon="ki-plus-squared"
              className="cursor-pointer"
              onClick={() => redirectUrl(`/add`)}
            />
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full">
          <DataTable
            title="Pustaka Suplier"
            columns={columns}
            data={supplierList}
            filter={filter}
            setFilter={setFilter}
            className="w-full"
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
          />
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Konfirmasi"
          message="Apakah anda yakin ingin menghapus suplier?"
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
            refetch();
          }}
        />
      )}
    </Fragment>
  );
}
