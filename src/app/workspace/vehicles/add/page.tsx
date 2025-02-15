"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import { useCreateVehicleMutation } from "@/services/api"; // Assuming you have this mutation created
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

interface PayloadType {
  showroomName?: string;
  ownerName?: string;
  expeditionName?: string;
  merk?: string;
  series?: string;
  color?: string;
  type?: string;
  chasisNumber?: string;
  machineNumber?: string;
  description?: string;
}

export default function AddNewVehicle() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState<PayloadType>({
    showroomName: "",
    ownerName: "",
    expeditionName: "",
    merk: "",
    series: "",
    color: "",
    type: "",
    chasisNumber: "",
    machineNumber: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    showroomName: "",
    ownerName: "",
    expeditionName: "",
    merk: "",
    series: "",
    color: "",
    type: "",
    chasisNumber: "",
    machineNumber: "",
  });

  const [createVehicle] = useCreateVehicleMutation();

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      showroomName: payload.showroomName ? "" : "Nama Showroom wajib diisi.",
      ownerName: payload.ownerName ? "" : "Nama Pemilik wajib diisi.",
      expeditionName: payload.expeditionName
        ? ""
        : "Nama Ekspedisi wajib diisi.",
      merk: payload.merk ? "" : "Merk wajib diisi.",
      series: payload.series ? "" : "Seri wajib diisi.",
      color: payload.color ? "" : "Warna wajib diisi.",
      type: payload.type ? "" : "Tipe wajib diisi.",
      chasisNumber: payload.chasisNumber ? "" : "Nomor Rangka wajib diisi.",
      machineNumber: payload.machineNumber ? "" : "Nomor Mesin wajib diisi.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setOpenModal(true);
    }
  };

  const _executeSubmit = async () => {
    try {
      await createVehicle(payload).unwrap();
      setStatusMessage({
        message: "Penambahan kendaraan berhasil!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/vehicles"); // Redirect to vehicle list page
    } catch (error) {
      setStatusMessage({
        message: "Gagal menambahkan kendaraan.",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menambahkan kendaraan:", error);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Tambah Kendaraan
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir penambahan kendaraan baru.
              </p>
            </div>
          </div>
        </div>
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex max-w-full min-w-fit">
            <Card
              styleHeader={"justify-start"}
              contentHeader={
                <p className="font-semibold">Informasi Kendaraan</p>
              }
              styleFooter={"justify-end"}
              contentFooter={
                <div className="flex justify-end gap-2 ">
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
                    onClick={() => handleSubmit()}
                  />
                </div>
              }
            >
              <div className="space-y-4 my-4">
                <InputText
                  type="text"
                  label="Nama Showroom"
                  required={true}
                  placeholder="Nama Showroom"
                  className="w-full"
                  value={payload.showroomName || ""}
                  onChange={(e) => handleChange("showroomName", e.target.value)}
                  error={errors.showroomName}
                />
                <InputText
                  type="text"
                  label="Nama Pemilik"
                  required={true}
                  placeholder="Nama Pemilik"
                  className="w-full"
                  value={payload.ownerName || ""}
                  onChange={(e) => handleChange("ownerName", e.target.value)}
                  error={errors.ownerName}
                />
                <InputText
                  type="text"
                  label="Nama Ekspedisi"
                  required={true}
                  placeholder="Nama Ekspedisi"
                  className="w-full"
                  value={payload.expeditionName || ""}
                  onChange={(e) =>
                    handleChange("expeditionName", e.target.value)
                  }
                  error={errors.expeditionName}
                />
                <InputText
                  type="text"
                  label="Merk"
                  required={true}
                  placeholder="Merk Kendaraan"
                  className="w-full"
                  value={payload.merk || ""}
                  onChange={(e) => handleChange("merk", e.target.value)}
                  error={errors.merk}
                />
                <InputText
                  type="text"
                  label="Seri"
                  required={true}
                  placeholder="Seri Kendaraan"
                  className="w-full"
                  value={payload.series || ""}
                  onChange={(e) => handleChange("series", e.target.value)}
                  error={errors.series}
                />
                <InputText
                  type="text"
                  label="Warna"
                  required={true}
                  placeholder="Warna Kendaraan"
                  className="w-full"
                  value={payload.color || ""}
                  onChange={(e) => handleChange("color", e.target.value)}
                  error={errors.color}
                />
                <InputText
                  type="text"
                  label="Tipe"
                  required={true}
                  placeholder="Tipe Kendaraan"
                  className="w-full"
                  value={payload.type || ""}
                  onChange={(e) => handleChange("type", e.target.value)}
                  error={errors.type}
                />
                <InputText
                  type="text"
                  label="Nomor Rangka"
                  required={true}
                  placeholder="Nomor Rangka"
                  className="w-full"
                  value={payload.chasisNumber || ""}
                  onChange={(e) => handleChange("chasisNumber", e.target.value)}
                  error={errors.chasisNumber}
                />
                <InputText
                  type="text"
                  label="Nomor Mesin"
                  required={true}
                  placeholder="Nomor Mesin"
                  className="w-full"
                  value={payload.machineNumber || ""}
                  onChange={(e) =>
                    handleChange("machineNumber", e.target.value)
                  }
                  error={errors.machineNumber}
                />
                <InputText
                  type="text"
                  label="Deskripsi"
                  placeholder="Deskripsi Kendaraan"
                  className="w-full"
                  value={payload.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeSubmit()}
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
