"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import React, { Fragment, useState, useEffect } from "react";

interface ProjectPayload {
  code?: string;
  name?: string;
  description?: string;
}

export default function EditProject({ project }: { project: ProjectPayload }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState<ProjectPayload>(project);

  const [errors, setErrors] = useState({
    code: "",
    name: "",
  });

  const handleChange = (key: string, value: string) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload({ ...payload, [key]: value });
  };

  const validateForm = () => {
    const newErrors = {
      code: payload.code ? "" : "Kode proyek wajib diisi.",
      name: payload.name ? "" : "Nama proyek wajib diisi.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
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
        message: "Perubahan proyek berhasil disimpan!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/projects");
    } catch (error) {
      setStatusMessage({
        message: "Gagal mengubah proyek.",
        type: "Error",
      });
      setSuccessModal(true);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 pt-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800">Edit Proyek</h1>
          <p className="text-base text-gray-600 pb-3">
            Formulir pengubahan data proyek.
          </p>
        </div>
        <div className="px-10 pt-4 sm:px-6 lg:px-8">
          <Card
            styleHeader="justify-start"
            contentHeader={<p className="font-semibold">Informasi Proyek</p>}
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
            <div className="w-[1000px] grid grid-cols-2 gap-x-6 gap-y-4 my-4">
              <InputText
                type="text"
                label="Kode Proyek"
                required
                placeholder="Contoh: PROJ-001"
                className="w-full"
                value={payload.code || ""}
                onChange={(e) => handleChange("code", e.target.value)}
                error={errors.code}
              />
              <InputText
                type="text"
                label="Nama Proyek"
                required
                placeholder="Contoh: Proyek Percontohan"
                className="w-full"
                value={payload.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
              <InputText
                type="text"
                label="Keterangan"
                placeholder="Tambahkan keterangan (opsional)"
                className="w-full col-span-2"
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
    </Fragment>
  );
}
