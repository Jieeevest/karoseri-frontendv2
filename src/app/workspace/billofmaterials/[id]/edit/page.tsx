"use client";
import {
  Card,
  InputText,
  SuccessModal,
  ConfirmationModal,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

interface PayloadType {
  bomCode?: string;
  productName?: string;
  productType?: string;
  unit?: string;
  component?: string;
  componentQty?: string;
  description?: string;
}

interface EditProps {
  initialData: PayloadType;
}

export default function EditBillOfMaterials({ initialData }: EditProps) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });

  const [payload, setPayload] = useState<PayloadType>({
    bomCode: "",
    productName: "",
    productType: "",
    unit: "",
    component: "",
    componentQty: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    bomCode: "",
    productName: "",
    productType: "",
    unit: "",
    component: "",
    componentQty: "",
  });

  useEffect(() => {
    if (initialData) {
      setPayload(initialData);
    }
  }, [initialData]);

  const handleChange = (key: string, value: string) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      bomCode: payload.bomCode ? "" : "Kode BoM wajib diisi.",
      productName: payload.productName ? "" : "Nama Produk wajib diisi.",
      productType: payload.productType ? "" : "Tipe Produk wajib diisi.",
      unit: payload.unit ? "" : "Satuan wajib diisi.",
      component: payload.component ? "" : "Komponen wajib diisi.",
      componentQty: payload.componentQty ? "" : "Jumlah Komponen wajib diisi.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setOpenModal(true);
    }
  };

  const _executeEdit = async () => {
    try {
      // TODO: ganti dengan mutation update BoM
      setStatusMessage({
        message: "Perubahan BoM berhasil disimpan!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/bill-of-materials");
    } catch (error) {
      setStatusMessage({
        message: "Gagal menyimpan perubahan.",
        type: "Error",
      });
      setSuccessModal(true);
    }
  };

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Bill of Materials
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir perubahan data BoM.
              </p>
            </div>
          </div>
        </div>
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex max-w-full min-w-fit">
            <Card
              styleHeader="justify-start"
              contentHeader={<p className="font-semibold">Informasi BoM</p>}
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
                    text="Simpan Perubahan"
                    onClick={handleSubmit}
                  />
                </div>
              }
            >
              <div className="w-[1300px] grid grid-cols-2 gap-x-6 gap-y-4 my-4">
                <InputText
                  type="text"
                  label="Kode BoM"
                  required
                  placeholder="Contoh: BOM-001"
                  className="w-full"
                  value={payload.bomCode || ""}
                  onChange={(e) => handleChange("bomCode", e.target.value)}
                  error={errors.bomCode}
                />
                <InputText
                  type="text"
                  label="Nama Produk"
                  required
                  placeholder="Contoh: Kursi Kayu"
                  className="w-full"
                  value={payload.productName || ""}
                  onChange={(e) => handleChange("productName", e.target.value)}
                  error={errors.productName}
                />
                <InputText
                  type="text"
                  label="Tipe Produk"
                  required
                  placeholder="Contoh: Finished Good"
                  className="w-full"
                  value={payload.productType || ""}
                  onChange={(e) => handleChange("productType", e.target.value)}
                  error={errors.productType}
                />
                <InputText
                  type="text"
                  label="Satuan"
                  required
                  placeholder="Contoh: pcs"
                  className="w-full"
                  value={payload.unit || ""}
                  onChange={(e) => handleChange("unit", e.target.value)}
                  error={errors.unit}
                />
                <InputText
                  type="text"
                  label="Komponen"
                  required
                  placeholder="Contoh: Kayu Jati"
                  className="w-full"
                  value={payload.component || ""}
                  onChange={(e) => handleChange("component", e.target.value)}
                  error={errors.component}
                />
                <InputText
                  type="text"
                  label="Jumlah Komponen"
                  required
                  placeholder="Contoh: 5"
                  className="w-full"
                  value={payload.componentQty || ""}
                  onChange={(e) => handleChange("componentQty", e.target.value)}
                  error={errors.componentQty}
                />
                <InputText
                  type="text"
                  label="Keterangan"
                  placeholder="Tambahkan keterangan (opsional)"
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
          handleConfirm={_executeEdit}
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
