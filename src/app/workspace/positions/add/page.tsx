"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
  TextArea,
} from "@/components/atoms";
import { useCreatePositionMutation } from "@/services/api";
import DefaultButton from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

interface PayloadType {
  name?: string;
  description?: string;
  status?: string;
}

export default function AddNewPosition() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState<PayloadType>({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const [createPosition] = useCreatePositionMutation();

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: payload.name ? "" : "Nama Jabatan wajib diisi.",
      description: payload.description ? "" : "Deskripsi wajib diisi.",
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
      await createPosition(payload).unwrap();
      setStatusMessage({
        message: "Penambahan posisi berhasil!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/positions"); // Redirect to positions list
    } catch (error) {
      setStatusMessage({
        message: "Gagal menambahkan posisi",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menambahkan posisi:", error);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Tambah Jabatan
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir penambahan posisi jabatan baru.
              </p>
            </div>
          </div>
        </div>
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex max-w-full min-w-fit">
            <Card
              styleHeader={"justify-start"}
              contentHeader={<p className="font-semibold">Informasi Jabatan</p>}
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
              <div className="w-[800px] space-y-4 my-4">
                <InputText
                  type="text"
                  label="Nama Jabatan"
                  required={true}
                  placeholder="Nama Jabatan"
                  className="w-full"
                  value={payload.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                />
                <TextArea
                  label="Deskripsi"
                  required={true}
                  placeholder="Deskripsi jabatan"
                  className="w-full"
                  onChange={(e) => handleChange("description", e.target.value)}
                  value={payload.description}
                  error={errors.description}
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
