"use client";
import React, { Fragment, useState } from "react";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
  TextArea,
} from "@/components/atoms";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/services/api";
import DefaultButton from "@/components/atoms/Button";
import { useParams, useRouter } from "next/navigation";

interface PayloadType {
  name?: string;
  description?: string;
  status?: string;
}

export default function EditKaroseriCategories() {
  const router = useRouter();
  const searchParams = useParams();
  const id = String(searchParams.id);
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

  const [updateCategory] = useUpdateCategoryMutation();

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: payload.name ? "" : "Nama Kategori wajib diisi.",
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
      await updateCategory({ id: Number(id), updates: payload }).unwrap();
      setStatusMessage({
        message: "Perubahan kategori berhasil!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
    } catch (error) {
      setStatusMessage({
        message: "Gagal merubah kategori",
        type: "Error",
      });
      setOpenModal(false);
      setSuccessModal(true);
      console.error("Gagal merubah kategori:", error);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Ubah Informasi Kategori Karoseri
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir perubahan data kategori karoseri.
              </p>
            </div>
          </div>
        </div>
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex max-w-full min-w-fit">
            <Card
              styleHeader={"justify-start"}
              contentHeader={
                <p className="font-semibold">Informasi kategori</p>
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
              <div className="w-[1300px] space-y-4 my-4">
                <InputText
                  type="text"
                  label="Nama Grup"
                  required={true}
                  placeholder="Nama Grup"
                  className="w-[800px]"
                  value={payload.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                />
                <TextArea
                  label="Deskripsi"
                  required={true}
                  placeholder="Deskripsi grup"
                  className="w-[800px]"
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
          title={"Konfirmasi"}
          message={"Apakah anda yakin ingin merubah data kategori ini?"}
          buttonText="Ya, Ubah"
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
            router.push("/workspace/categories");
          }}
        />
      )}
    </Fragment>
  );
}
