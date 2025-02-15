"use client";
import {
  Card,
  ConfirmationModal,
  InputText,
  Select,
  SuccessModal,
  TextArea,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { nationalities } from "@/app/constants/nationalities";
import Loading from "@/components/molecules/Loading";
import Error404 from "@/components/molecules/Error404";

interface PayloadType {
  nik: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  employeeNumber?: string;
  profileImage?: string;
  joinedDate?: string;
  resignedDate?: string;
  homeAddress?: string;
  birthPlace?: string;
  birthDate?: string;
  gender?: string;
  nationality?: string;
  religion?: string;
  maritalStatus?: string;
  positionId: number | null;
  roleId: number | null;
  groupId: number | null;
  createdAt?: string;
  updatedAt?: string;
}
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
  const [payload, setPayload] = useState<PayloadType>({
    nik: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    employeeNumber: "",
    profileImage: "",
    joinedDate: "",
    resignedDate: "",
    homeAddress: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    positionId: null,
    roleId: null,
    groupId: null,
    createdAt: "",
    updatedAt: "",
  });
  const [errors, setErrors] = useState({
    nik: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    employeeNumber: "",
    profileImage: "",
    joinedDate: "",
    resignedDate: "",
    homeAddress: "",
    positionId: "",
    roleId: "",
    groupId: "",
  });

  const [createEmployee] = useCreateEmployeeMutation();
  const { data, isLoading, isError } = useGetEmployeeByIdQuery(Number(id));

  console.log(data);

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev) => ({ ...prev, [key]: "" }));
    return setPayload({
      ...payload,
      [key]: value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,13}$/;

    const newErrors = {
      nik: payload.nik ? "" : "NIK wajib diisi.",
      fullName: payload.fullName ? "" : "Nama Lengkap wajib diisi.",
      email: !payload.email
        ? "Email wajib diisi."
        : !emailRegex.test(payload.email)
        ? "Format email tidak valid."
        : "",
      phoneNumber: !payload.phoneNumber
        ? "No Telepon wajib diisi."
        : !phoneRegex.test(payload.phoneNumber)
        ? "Format no telepon tidak valid."
        : "",
      birthPlace: payload.birthPlace ? "" : "Tempat Lahir wajib diisi.",
      birthDate: payload.birthDate ? "" : "Tanggal Lahir wajib diisi.",
      gender: payload.gender ? "" : "Jenis Kelamin wajib diisi.",
      nationality: payload.nationality ? "" : "Kebangsaan wajib diisi.",
      religion: payload.religion ? "" : "Agama wajib diisi.",
      maritalStatus: payload.maritalStatus
        ? ""
        : "Status Pernikahan wajib diisi.",
      employeeNumber: payload.employeeNumber
        ? ""
        : "Nomor Karyawan wajib diisi.",
      profileImage: payload.profileImage
        ? ""
        : "URL Gambar Profil wajib diisi.",
      joinedDate: payload.joinedDate ? "" : "Tanggal Bergabung wajib diisi.",
      resignedDate: payload.resignedDate
        ? ""
        : "Tanggal Mengundurkan Diri wajib diisi.",
      homeAddress: payload.homeAddress ? "" : "Alamat wajib diisi.",
      positionId: payload.positionId ? "" : "Posisi wajib diisi.",
      roleId: payload.roleId ? "" : "Role wajib diisi.",
      groupId: payload.groupId ? "" : "Group wajib diisi.",
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
      await createEmployee(payload).unwrap();
      setStatusMessage({
        message: "Penambahan karyawan berhasil!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/workspace/employees");
    } catch (error) {
      setStatusMessage({
        message: "Gagal menambahkan karyawan",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Gagal menambahkan karyawan:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error404 />;
  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Informasi Karyawan
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir penambahan karyawan.
              </p>
            </div>
          </div>
        </div>
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex max-w-full min-w-fit">
            <Card
              styleHeader={"justify-start"}
              contentHeader={
                <p className="font-semibold">Informasi Karyawan</p>
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
                {/* Left Column */}
                <div className="w-[600px] space-y-4 my-4 mr-10">
                  <InputText
                    type="number"
                    label="NIK"
                    required={true}
                    placeholder="NIK"
                    className="w-full"
                    value={payload.nik}
                    onChange={(e) => handleChange("nik", e.target.value)}
                    error={errors.nik}
                  />
                  <InputText
                    type="text"
                    label="Nama Lengkap"
                    required={true}
                    placeholder="Nama Lengkap"
                    className="w-full"
                    value={payload.fullName || ""}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    error={errors.fullName}
                  />
                  <InputText
                    type="email"
                    label="Email"
                    required={true}
                    placeholder="Email"
                    className="w-full"
                    value={payload.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={errors.email}
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
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Tempat & Tanggal Lahir
                      <span className="text-danger">*</span>
                    </label>
                    <div className="flex justify-between gap-2 w-full">
                      <InputText
                        type="text"
                        required={true}
                        placeholder="Tempat Lahir"
                        className="w-full"
                        value={payload.birthPlace || ""}
                        onChange={(e) =>
                          handleChange("birthPlace", e.target.value)
                        }
                        error={errors.birthPlace}
                      />
                      <InputText
                        type="date"
                        required={true}
                        placeholder="Tanggal Lahir"
                        className="w-full"
                        value={payload.birthDate}
                        onChange={(e) =>
                          handleChange("birthDate", e.target.value)
                        }
                        error={errors.birthDate}
                      />
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Jenis Kelamin
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.gender) || ""}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        optionValue={[
                          {
                            label: "Laki-laki",
                            value: "male",
                          },
                          {
                            label: "Perempuan",
                            value: "female",
                          },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Kebangsaan
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.nationality) || ""}
                        onChange={(e) =>
                          handleChange("nationality", e.target.value)
                        }
                        optionValue={nationalities}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.nationality}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Agama
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.religion) || ""}
                        onChange={(e) =>
                          handleChange("religion", e.target.value)
                        }
                        optionValue={[
                          {
                            label: "Islam",
                            value: "islam",
                          },
                          {
                            label: "Kristen",
                            value: "kristen",
                          },
                          {
                            label: "Hindu",
                            value: "hindu",
                          },
                          {
                            label: "Budha",
                            value: "budha",
                          },
                          {
                            label: "Konghucu",
                            value: "konghucu",
                          },
                          {
                            label: "Lainnya",
                            value: "lainnya",
                          },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.religion}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Status Pernikahan
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.maritalStatus) || ""}
                        onChange={(e) =>
                          handleChange("maritalStatus", e.target.value)
                        }
                        optionValue={[
                          {
                            label: "Menikah",
                            value: "menikah",
                          },
                          {
                            label: "Belum Menikah",
                            value: "belum-menikah",
                          },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.maritalStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="w-[600px] space-y-4 my-4">
                  <InputText
                    type="text"
                    label="Nomor Karyawan"
                    required={true}
                    placeholder="Nomor Karyawan"
                    className="w-full"
                    value={payload.employeeNumber || ""}
                    onChange={(e) =>
                      handleChange("employeeNumber", e.target.value)
                    }
                    error={errors.employeeNumber}
                  />
                  <InputText
                    type="text"
                    label="URL Gambar Profil"
                    required={true}
                    placeholder="Profile Image URL"
                    className="w-full"
                    value={payload.profileImage || ""}
                    onChange={(e) =>
                      handleChange("profileImage", e.target.value)
                    }
                    error={errors.profileImage}
                  />
                  <InputText
                    type="date"
                    label="Tanggal Bergabung"
                    required={true}
                    placeholder="Tanggal Bergabung"
                    className="w-full"
                    value={payload.joinedDate || ""}
                    onChange={(e) => handleChange("joinedDate", e.target.value)}
                    error={errors.joinedDate}
                  />
                  <InputText
                    type="date"
                    label="Tanggal Mengundurkan"
                    required={true}
                    placeholder="Tanggal Mengundurkan"
                    className="w-full"
                    value={payload.resignedDate || ""}
                    onChange={(e) =>
                      handleChange("resignedDate", e.target.value)
                    }
                    error={errors.resignedDate}
                  />
                  <TextArea
                    label="Alamat"
                    required={true}
                    placeholder="Alamat"
                    className="w-full"
                    onChange={(e) => handleChange("hqAddress", e.target.value)}
                    value={payload.homeAddress}
                    error={errors.homeAddress}
                  />

                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Jabatan
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.positionId) || ""}
                        onChange={(e) =>
                          handleChange("positionId", e.target.value)
                        }
                        optionValue={[
                          { label: "Posisi 1", value: "posisi-1" },
                          { label: "Posisi 2", value: "posisi-2" },
                          { label: "Posisi 3", value: "posisi-3" },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.positionId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Role
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.roleId) || ""}
                        onChange={(e) => handleChange("roleId", e.target.value)}
                        optionValue={[
                          { label: "Role 1", value: "role-1" },
                          { label: "Role 2", value: "role-2" },
                          { label: "Role 3", value: "role-3" },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.roleId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                    <label className="form-label max-w-44">
                      Group
                      <span className="text-danger">*</span>
                    </label>
                    <div className="w-full">
                      <Select
                        className="w-full"
                        value={String(payload.groupId) || ""}
                        onChange={(e) =>
                          handleChange("groupId", e.target.value)
                        }
                        optionValue={[
                          { label: "Group 1", value: "group-1" },
                          { label: "Group 2", value: "group-2" },
                          { label: "Group 3", value: "group-3" },
                        ]}
                      />
                      {errors && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.groupId}
                        </p>
                      )}
                    </div>
                  </div>
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
