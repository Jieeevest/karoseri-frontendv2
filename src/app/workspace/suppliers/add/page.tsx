"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
  TextArea,
  Select,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import { useCreateSupplierMutation } from "@/services/api"; // Assuming you have this mutation created
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

interface PayloadType {
  name?: string;
  category?: string;
  bank?: string;
  bankNumber?: string;
  bankOwner?: string;
  phoneNumber?: string;
  phoneNumberAlt?: string;
  email?: string;
  homeAddress?: string;
  totalDebt?: number;
}

export default function AddNewSupplier() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState<PayloadType>({
    name: "",
    category: "",
    bank: "",
    bankNumber: "",
    bankOwner: "",
    phoneNumber: "",
    phoneNumberAlt: "",
    email: "",
    homeAddress: "",
    totalDebt: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    bank: "",
    bankNumber: "",
    bankOwner: "",
    phoneNumber: "",
    email: "",
    homeAddress: "",
  });

  const [createSupplier] = useCreateSupplierMutation();

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10,13}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: payload.name ? "" : "Nama Supplier wajib diisi.",
      category: payload.category ? "" : "Kategori wajib diisi.",
      bank: payload.bank ? "" : "Bank wajib diisi.",
      bankNumber: payload.bankNumber ? "" : "Nomor Rekening wajib diisi.",
      bankOwner: payload.bankOwner ? "" : "Pemilik Rekening wajib diisi.",
      phoneNumber: !payload.phoneNumber
        ? "No Telepon wajib diisi."
        : !phoneRegex.test(payload.phoneNumber)
        ? "Format no telepon tidak valid."
        : "",
      email: !payload.email
        ? "Email wajib diisi."
        : !emailRegex.test(payload.email)
        ? "Format email tidak valid."
        : "",
      homeAddress: payload.homeAddress ? "" : "Alamat wajib diisi.",
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
      await createSupplier(payload).unwrap();
      setStatusMessage({
        message: "Penambahan supplier berhasil!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/suppliers"); // Redirect to suppliers list
    } catch (error) {
      setStatusMessage({
        message: "Gagal menambahkan supplier",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menambahkan supplier:", error);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Tambah Supplier
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir penambahan supplier baru.
              </p>
            </div>
          </div>
        </div>
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex max-w-full min-w-fit">
            <Card
              styleHeader={"justify-start"}
              contentHeader={
                <p className="font-semibold">Informasi Supplier</p>
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
              <div className="flex w-[1300px] gap-4">
                <div className="w-[600px] space-y-4 my-4">
                  <InputText
                    type="text"
                    label="Nama Supplier"
                    required={true}
                    placeholder="Nama Supplier"
                    className="w-full"
                    value={payload.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    error={errors.name}
                  />
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Kategori
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.category) || ""}
                        onChange={(e) =>
                          handleChange("category", e.target.value)
                        }
                        optionValue={[
                          { label: "PPN", value: "ppn" },
                          { label: "Non PPN", value: "non-ppn" },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Bank
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.bank) || ""}
                        onChange={(e) => handleChange("bank", e.target.value)}
                        optionValue={[
                          { label: "BCA", value: "bca" },
                          { label: "BRI", value: "bri" },
                          { label: "Mandiri", value: "mandiri" },
                          { label: "BNI", value: "bni" },
                          { label: "Other", value: "other" },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.bank}
                        </p>
                      )}
                    </div>
                  </div>
                  <InputText
                    type="text"
                    label="Nomor Rekening"
                    required={true}
                    placeholder="Nomor Rekening"
                    className="w-full"
                    value={payload.bankNumber || ""}
                    onChange={(e) => handleChange("bankNumber", e.target.value)}
                    error={errors.bankNumber}
                  />
                  <InputText
                    type="text"
                    label="Pemilik Rekening"
                    required={true}
                    placeholder="Pemilik Rekening"
                    className="w-full"
                    value={payload.bankOwner || ""}
                    onChange={(e) => handleChange("bankOwner", e.target.value)}
                    error={errors.bankOwner}
                  />
                  <InputText
                    type="number"
                    label="No Telepon"
                    required={true}
                    placeholder="No Telepon"
                    className="w-full"
                    value={payload.phoneNumber || ""}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                    error={errors.phoneNumber}
                  />
                </div>
                <div className="w-[600px] space-y-4 my-4">
                  <InputText
                    type="text"
                    label="Email"
                    required={true}
                    placeholder="Email"
                    className="w-full"
                    value={payload.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={errors.email}
                  />
                  <TextArea
                    label="Alamat"
                    required={true}
                    placeholder="Alamat"
                    className="w-full"
                    onChange={(e) =>
                      handleChange("homeAddress", e.target.value)
                    }
                    value={payload.homeAddress}
                    error={errors.homeAddress}
                  />
                </div>
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
