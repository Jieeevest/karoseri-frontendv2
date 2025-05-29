"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
  TextArea,
} from "@/components/atoms";
import {
  useGetLocationByIdQuery,
  useUpdateLocationMutation,
} from "@/services/api";
import DefaultButton from "@/components/atoms/Button";
import { useParams, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

interface PayloadType {
  name?: string;
  description?: string;
  status?: string;
}

export default function UpdateLocation() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
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

  const { data: locationData } = useGetLocationByIdQuery(Number(id));
  const [updateLocation] = useUpdateLocationMutation();

  useEffect(() => {
    if (locationData?.data) {
      const currentData = locationData?.data;
      setPayload({
        name: currentData?.name ?? "",
        description: currentData?.description ?? "",
      });
    }
  }, [locationData]);

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: payload.name ? "" : "Nama Lokasi wajib diisi.",
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
      await updateLocation({ id: Number(id), updates: payload }).unwrap();
      setStatusMessage({
        message: "Perubahan lokasi penyimpanan berhasil",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
    } catch (error) {
      setStatusMessage({
        message: "Gagal merubah lokasi penyimpanan",
        type: "Error",
      });
      setOpenModal(false);
      setSuccessModal(true);
      console.error("Gagal menambahkan lokasi penyimpanan:", error);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Ubah Informasi Lokasi Penyimpanan
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir perubahan lokasi penyimpanan baru.
              </p>
            </div>
          </div>
        </div>
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex max-w-full min-w-fit">
            <Card
              styleHeader={"justify-start"}
              contentHeader={
                <p className="font-semibold">Informasi Lokasi Penyimpanan</p>
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
                  label="Nama Lokasi Penyimpanan"
                  required={true}
                  placeholder="Nama Lokasi Penyimpanan"
                  className="w-full"
                  value={payload.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                />
                <TextArea
                  label="Deskripsi"
                  required={true}
                  placeholder="Deskripsi lokasi penyimpanan"
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
          title={"Konfirmasi"}
          message={
            "Apakah anda yakin ingin melakukan perubahan pada lokasi penyimpanan ini?"
          }
          buttonText="Ya, Ubah"
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeSubmit()}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage?.type}
          message={statusMessage?.message}
          handleClose={() => {
            setSuccessModal(false);
            router.push("/workspace/locations");
          }}
        />
      )}
    </Fragment>
  );
}
