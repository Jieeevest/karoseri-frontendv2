"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PayloadType {
  code?: string;
  name?: string;
  description?: string;
}

export default function AddKaroseriCategory() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });

  const [payload, setPayload] = useState<PayloadType>({
    code: "",
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    code: "",
    name: "",
  });

  const handleChange = (key: string, value: string) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      code: payload.code ? "" : "Kode kategori wajib diisi.",
      name: payload.name ? "" : "Nama kategori wajib diisi.",
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
      // TODO: replace with mutation
      setStatusMessage({
        message: "Kategori karoseri berhasil ditambahkan!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/karoseri-category");
    } catch (error) {
      setStatusMessage({
        message: "Gagal menambahkan kategori karoseri.",
        type: "Error",
      });
      setSuccessModal(true);
    }
  };

  return (
    <>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Tambah Kategori Karoseri
              </h1>
              <p className="text-base text-gray-600">
                Formulir penambahan kategori karoseri.
              </p>
            </div>
          </div>
        </div>

        <div className="px-10 pt-4 sm:px-6 lg:px-8">
          <Card
            styleHeader="justify-start"
            contentHeader={<p className="font-semibold">Informasi Kategori</p>}
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
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 my-4 w-[800px]">
              <InputText
                label="Kode Kategori"
                required
                placeholder="Contoh: KRS-001"
                value={payload.code || ""}
                onChange={(e) => handleChange("code", e.target.value)}
                error={errors.code}
              />
              <InputText
                label="Nama Kategori"
                required
                placeholder="Contoh: Truk Box"
                value={payload.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
              <InputText
                label="Deskripsi"
                placeholder="Deskripsi tambahan (opsional)"
                value={payload.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </Card>
        </div>
      </div>

      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          handleClose={() => setOpenModal(false)}
          handleConfirm={_executeSubmit}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage.type}
          message={statusMessage.message}
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </>
  );
}
