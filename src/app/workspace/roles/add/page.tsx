"use client";
import React, { Fragment, useState } from "react";
import {
  Card,
  ConfirmationModal,
  InputText,
  SuccessModal,
  TextArea,
  Button,
} from "@/components/atoms";
import { useCreateRoleMutation } from "@/services/api";
import { useRouter } from "next/navigation";

export default function AddNewRole() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState({
    name: "",
    description: "",
    urlMenu: "",
    iconMenu: "",
    category: "",
    orderingNumber: 0,
    parentMenu: {},
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [createRoles] = useCreateRoleMutation();

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: payload.name ? "" : "Nama Role Akses wajib diisi.",
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
      await createRoles(payload).unwrap();
      setOpenModal(false);
      setStatusMessage({
        message: "Berhasil menambahkan role akses!",
        type: "Success",
      });
      setSuccessModal(true);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Gagal menambahkan role akses",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menambahkan role akses:", error);
    }
  };
  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Tambah Role Akses
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Formulir penambahan role akses baru.
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex max-w-full min-w-fit">
          <Card
            styleHeader={"justify-start"}
            contentHeader={
              <p className="font-semibold">Informasi Role Akses</p>
            }
            styleFooter={"justify-end"}
            contentFooter={
              <div className="flex justify-end gap-2 ">
                <Button
                  type="pill"
                  appearance="light"
                  text="Kembali"
                  onClick={() => router.back()}
                />
                <Button
                  type="pill"
                  appearance="primary"
                  text="Simpan"
                  onClick={() => handleSubmit()}
                />
              </div>
            }
          >
            <div className="w-[1300px] space-y-4 my-4">
              <InputText
                type="text"
                label="Nama Role Akses"
                required={true}
                placeholder="Masukkan nama role akses..."
                className="w-[800px]"
                value={payload.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
              <TextArea
                label="Deskripsi"
                required={true}
                placeholder="Masukkan deskripsi..."
                className="w-[800px]"
                onChange={(e) => handleChange("description", e.target.value)}
                value={payload.description}
                error={errors.description}
              />
            </div>
          </Card>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Konfirmasi Penambahan Role Akses"
          message="Apakah Anda yakin ingin menambahkan role akses ini?"
          buttonText="Ya, Tambahkan"
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeSubmit()}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage?.type == "Success" ? "Sukses" : "Gagal"}
          message={statusMessage?.message}
          handleClose={() => {
            setSuccessModal(false);
            router.push("/workspace/roles");
          }}
        />
      )}
    </Fragment>
  );
}
