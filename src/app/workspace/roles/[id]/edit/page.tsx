"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  InputText,
  Button,
  TextArea,
  ConfirmationModal,
  SuccessModal,
} from "@/components/atoms";
import { useParams, useRouter } from "next/navigation";
import { useGetRoleByIdQuery, useUpdateRoleMutation } from "@/services/api";

export default function EditRole() {
  const router = useRouter();
  const searchParams = useParams();
  const id = String(searchParams.id);
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const { data: roleData } = useGetRoleByIdQuery(Number(id));
  const [updateRoles] = useUpdateRoleMutation();

  useEffect(() => {
    if (roleData?.data) {
      const currentData = roleData?.data;
      setPayload({
        name: currentData?.name ?? "",
        description: currentData?.description ?? "",
      });
    }
  }, [roleData]);

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
      await updateRoles({ id: Number(id), updates: payload }).unwrap();
      setOpenModal(false);
      setStatusMessage({
        message: "Berhasil merubah informasi role akses!",
        type: "Success",
      });
      setSuccessModal(true);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Gagal merubah informasi role akses",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal merubah informasi role akses:", error);
    }
  };
  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Ubah Informasi Role Akses
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Formulir perubahan informasi role akses.
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
          title="Konfirmasi Perubahan Role Akses"
          message="Apakah Anda yakin ingin merubah informasi role akses ini?"
          buttonText="Ya, Simpan"
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
