"use client";

import React, { useState, Fragment, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
  TextArea,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Loading from "@/components/molecules/Loading";
import dynamic from "next/dynamic";
import {
  useCreateInventoryMutation,
  useGetLocationsQuery,
  useGetSuppliersQuery,
} from "@/services/api";

const CustomSelect = dynamic(() => import("@/components/atoms/Select"), {
  ssr: false,
  loading: () => <Loading />,
});

interface PayloadType {
  name?: string;
  amount?: string;
  typeId?: { label: string; value: string } | null;
  categoryId?: { label: string; value: string } | null;
  locationId?: { label: string; value: string } | null;
  supplierId?: { label: string; value: string } | null;
  unit?: { label: string; value: string } | null;
  price?: string;
  minimumStock?: string;
  description?: string;
}

interface Option {
  id: number;
  name: string;
}

// Dummy data for dropdowns (replace with real fetch or props)
const jenis: Option[] = [
  { id: 1, name: "AMPLAS 150" },
  { id: 2, name: "AMPLAS 240" },
  { id: 3, name: "AMPLAS 280" },
  { id: 4, name: "AMPLAS 120" },
  { id: 5, name: "AMPLAS 100" },
  { id: 6, name: "AMPLAS 80" },
  { id: 7, name: "CAT MESIN BOR" },
  { id: 8, name: "BESI" },
  { id: 9, name: "BATU CUTTING" },
  { id: 10, name: "BATU FLEXIBLE" },
  { id: 11, name: "BATU GURINDA" },
  { id: 12, name: "BEHEL" },
  { id: 13, name: "KUAS" },
  { id: 14, name: "BRUSH" },
  { id: 15, name: "CNP" },
  { id: 16, name: "STEKER" },
  { id: 17, name: "COMPOUND" },
  { id: 18, name: "CONTACT TIP" },
  { id: 19, name: "CUTTER" },
  { id: 20, name: "CUTTING TIP" },
  { id: 21, name: "CUTTING TORCH" },
  { id: 22, name: "CYLINDER HIDRAULIC" },
  { id: 23, name: "DEMPUL" },
  { id: 24, name: "ELBOW" },
  { id: 25, name: "ENGSEL" },
  { id: 26, name: "ENGSEL PER" },
  { id: 27, name: "OLI" },
  { id: 28, name: "HANDLE" },
  { id: 29, name: "HARDENER" },
  { id: 30, name: "HOLLOW" },
  { id: 31, name: "SELANG HIDROLIK" },
  { id: 32, name: "ISOLASI BAKAR" },
  { id: 33, name: "KABEL NYAF" },
  { id: 34, name: "KABEL NYYHY" },
  { id: 35, name: "KABEL TIES" },
  { id: 36, name: "KACA MATA" },
  { id: 37, name: "KAIN KAPUR BESI" },
  { id: 38, name: "KAWAT LAS" },
  { id: 39, name: "MESIN BOR NOZZLE" },
  { id: 40, name: "KIT" },
  { id: 41, name: "KLEM" },
  { id: 42, name: "STOP KONTAK" },
  { id: 43, name: "KRAN AIR" },
  { id: 44, name: "KUNCIAN COR" },
  { id: 45, name: "KUNCIAN PER" },
  { id: 46, name: "LAKBAN KERTAS" },
  { id: 47, name: "LAMPU" },
  { id: 48, name: "LEM" },
  { id: 49, name: "MATA BOR" },
  { id: 50, name: "OBENG" },
  { id: 51, name: "MESIN BOR" },
  { id: 52, name: "MESIN GURINDA" },
  { id: 53, name: "ALAT UKUR" },
  { id: 54, name: "NEPPLE" },
  { id: 55, name: "ISOLASI HITAM" },
  { id: 56, name: "NOZZLE" },
  { id: 57, name: "TRIPLEK" },
  { id: 58, name: "PAKU RIVET" },
  { id: 59, name: "PER" },
  { id: 60, name: "PIPA HITAM" },
  { id: 61, name: "PLAT 1.2 MM" },
  { id: 62, name: "PLAT 1.5 MM" },
  { id: 63, name: "PLAT 1.8 MM" },
  { id: 64, name: "PLAT 2 MM" },
  { id: 65, name: "PLAT 8 MM" },
  { id: 66, name: "PLAT 10 MM" },
  { id: 67, name: "PLAT 20 MM" },
  { id: 68, name: "PLAT 1 MM" },
  { id: 69, name: "PLAT GALVALUM" },
  { id: 70, name: "MESIN POWER PACK" },
  { id: 71, name: "CAT" },
  { id: 72, name: "RANTAI" },
  { id: 73, name: "REGULATOR" },
  { id: 74, name: "SARUNG TANGAN" },
  { id: 75, name: "SEAL TAPE" },
  { id: 76, name: "SIKAT KAWAT" },
  { id: 77, name: "SKRUP" },
  { id: 78, name: "SKUN" },
  { id: 79, name: "STANG LAS" },
  { id: 80, name: "BOSTIK PU" },
  { id: 81, name: "TOMBOL" },
  { id: 82, name: "THINNER A SPECIAL" },
  { id: 83, name: "THINNER POLYGLOSS" },
  { id: 84, name: "TIP HOLDER" },
  { id: 85, name: "TREKER" },
  { id: 86, name: "UNP 100" },
  { id: 87, name: "UNP 120" },
  { id: 88, name: "UNP 150" },
  { id: 89, name: "UNP 200" },
  { id: 90, name: "UNP 65" },
  { id: 91, name: "UNP 80" },
  { id: 92, name: "CAT KEPALA BOR" },
  { id: 93, name: "KEPALA BOR" },
  { id: 94, name: "MUR" },
  { id: 95, name: "BAUT" },
  { id: 96, name: "RING" },
  { id: 97, name: "BAU" },
  { id: 98, name: "REFLECTOR" },
  { id: 99, name: "TERMINAL" },
];

const units: Option[] = [
  { id: 1, name: "Batang" },
  { id: 2, name: "Dus" },
  { id: 3, name: "Drigen" },
  { id: 4, name: "Drum" },
  { id: 5, name: "Galon" },
  { id: 6, name: "Kardus" },
  { id: 7, name: "Kaleng" },
  { id: 8, name: "Kilogram (KG)" },
  { id: 9, name: "Lembar" },
  { id: 10, name: "Liter" },
  { id: 11, name: "Meter" },
  { id: 12, name: "Pack" },
  { id: 13, name: "Pcs" },
  { id: 14, name: "Roll" },
  { id: 15, name: "Set" },
  { id: 16, name: "Sosis" },
  { id: 17, name: "Unit" },
];

const filter = {
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
};

const mapToOptions = (arr: Option[]) =>
  arr.map((item) => ({ label: item.name, value: item.id.toString() }));

export default function AddInventory() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

  const [payload, setPayload] = useState<PayloadType>({
    name: "",
    amount: "0",
    typeId: null,
    categoryId: null,
    locationId: null,
    supplierId: null,
    price: "0",
    unit: null,
    minimumStock: "0",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: locationData } = useGetLocationsQuery(filter);
  const { data: supplierData } = useGetSuppliersQuery(filter);

  const [createInventory] = useCreateInventoryMutation();

  const locations = useMemo(
    () => locationData?.data?.locations || [],
    [locationData?.data?.locations]
  );

  const suppliers = useMemo(
    () => supplierData?.data?.suppliers || [],
    [supplierData?.data?.suppliers]
  );

  const handleChange = (
    key: keyof PayloadType,
    value: string | { label: string; value: string } | null
  ) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: payload?.name ? "" : "Nama wajib diisi.",
      amount: payload?.amount ? "" : "Jumlah wajib diisi.",
      typeId: payload?.typeId ? "" : "Tipe wajib dipilih.",
      locationId: payload?.locationId ? "" : "Lokasi wajib dipilih.",
      supplierId: payload?.supplierId ? "" : "Supplier wajib dipilih.",
      price:
        Number(payload?.price) > 0 ? "" : "Harga harus lebih besar dari 0.",
      minimumStock:
        Number(payload?.minimumStock) > 0
          ? ""
          : "Stok minimal harus lebih besar dari 0.",
      unit: payload?.unit ? "" : "Satuan wajib dipilih.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setOpenModal(true);
    }
  };

  const _executeSubmit = async () => {
    try {
      const objectPayload = {
        ...payload,
        amount: Number(payload.amount) ?? 0,
        price: Number(payload.price),
        minimumStock: Number(payload.minimumStock),
        unit: payload.unit?.value,
        typeId: payload.typeId?.value,
        locationId: payload.locationId?.value,
        supplierId: payload.supplierId?.value,
      };
      await createInventory(objectPayload).unwrap();
      setStatusMessage({
        message: "Inventaris berhasil ditambahkan!",
        type: "Success",
      });
      setSuccessModal(true);
      setOpenModal(false);

      setTimeout(() => {
        router.push("/workspace/inventories");
      }, 1000);
    } catch (error) {
      setStatusMessage({
        message: "Gagal menambahkan inventaris.",
        type: "Error",
      });
      setSuccessModal(true);
      setOpenModal(false);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5">
        <div className="px-10 pt-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Tambah Inventaris
          </h1>
          <p className="text-base text-gray-600 px-0.5 pb-3">
            Formulir penambahan data inventaris.
          </p>
        </div>
        <div className="px-10 pt-4 sm:px-6 lg:px-8">
          <Card
            styleHeader="justify-start"
            contentHeader={
              <p className="font-semibold">Informasi Inventaris</p>
            }
            styleFooter="justify-end"
            contentFooter={
              <div className="flex justify-end gap-2">
                <DefaultButton
                  type="pill"
                  appearance="light"
                  text="Kembali"
                  onClick={() => router.back()}
                />
                <DefaultButton
                  type="pill"
                  appearance="primary"
                  text="Simpan"
                  onClick={handleSubmit}
                />
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 my-4 w-[1300px]">
              <InputText
                type="text"
                label="Nama Inventaris"
                required
                placeholder="Contoh: AS BULAT 16 MM x 6 M - HITAM"
                className="w-full"
                value={payload.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
              <InputText
                type="number"
                label="Jumlah Stok"
                required
                placeholder="Contoh: 10"
                className="w-full"
                value={payload.amount || ""}
                onChange={(e) => handleChange("amount", e.target.value)}
                error={errors.amount}
              />
              <CustomSelect
                label="Jenis"
                required={true}
                className="w-full"
                placeholder="Pilih Jenis"
                size="sm"
                value={payload.typeId}
                onChange={(value) => handleChange("typeId", value)}
                optionValue={mapToOptions(jenis)}
                error={errors.typeId}
              />
              <CustomSelect
                label="Satuan"
                required={true}
                className="w-full"
                placeholder="Pilih Satuan"
                size="sm"
                value={payload.unit}
                onChange={(value: any) => handleChange("unit", value)}
                optionValue={mapToOptions(units)}
                error={errors.unit}
              />
              <CustomSelect
                label="Lokasi Penyimpanan"
                required={true}
                className="w-full"
                placeholder="Pilih Lokasi"
                size="sm"
                value={payload.locationId}
                onChange={(value: any) => handleChange("locationId", value)}
                optionValue={locations?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
                error={errors.locationId}
              />
              <InputText
                type="number"
                label="Stok Minimal"
                required
                placeholder="Contoh: 3"
                className="w-full"
                value={payload.minimumStock || ""}
                onChange={(e) => handleChange("minimumStock", e.target.value)}
                error={errors.minimumStock}
              />
              <CustomSelect
                label="Suplier"
                required={true}
                className="w-full"
                placeholder="Pilih Suplier"
                size="sm"
                value={payload.supplierId}
                onChange={(value: any) => handleChange("supplierId", value)}
                optionValue={suppliers?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
                error={errors.supplierId}
              />
              <InputText
                type="number"
                label="Harga"
                required
                placeholder="Contoh: 10000"
                className="w-full"
                value={payload.price || ""}
                onChange={(e) => handleChange("price", e.target.value)}
                error={errors.price}
              />
              <TextArea
                label="Keterangan"
                placeholder="Tambahkan keterangan (opsional)"
                className="w-full"
                onChange={(e) => handleChange("description", e.target.value)}
                value={payload.description}
              />
            </div>
          </Card>
        </div>

        {openModal && (
          <ConfirmationModal
            showModal={openModal}
            message="Apakah anda yakin ingin menambahkan barang ini?"
            buttonText="Ya, Tambahkan"
            handleClose={() => setOpenModal(false)}
            handleConfirm={_executeSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            showModal={successModal}
            title={statusMessage.type == "Success" ? "Sukses" : "Gagal"}
            message={statusMessage.message}
            handleClose={() => setSuccessModal(false)}
          />
        )}
      </div>
    </Fragment>
  );
}
