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
  useGetGroupsQuery,
  useGetPositionsQuery,
  useGetRolesQuery,
} from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import React, { Fragment, useMemo, useState } from "react";
import { nationalities } from "@/app/constants/nationalities";
import Loading from "@/components/molecules/Loading";
import Error404 from "@/components/molecules/Error404";
import CustomSelect from "@/components/atoms/Select";

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
  gender?: {
    label: string;
    value: string;
  } | null;
  nationality?: {
    label: string;
    value: string;
  } | null;
  religion?: {
    label: string;
    value: string;
  } | null;
  maritalStatus?: {
    label: string;
    value: string;
  } | null;
  positionId?: {
    label: string;
    value: string;
  } | null;
  roleId?: {
    label: string;
    value: string;
  } | null;
  groupId?: {
    label: string;
    value: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

const filter = {
  keyword: "",
  status: "active",
  pageSize: 5,
  page: 1,
  totalData: 0,
} as {
  keyword: string;
  status: string;
  pageSize: number;
  page: number;
  totalData: number;
};

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
    gender: null,
    nationality: null,
    religion: null,
    maritalStatus: null,
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
  const { data: positionData, isLoading: isLoadingPosition } =
    useGetPositionsQuery(filter);
  const { data: roleData, isLoading: isLoadingRole } = useGetRolesQuery(filter);
  const { data: groupData, isLoading: isLoadingGroup } =
    useGetGroupsQuery(filter);

  const positions = useMemo(
    () => positionData?.data?.positions || [],
    [positionData?.data?.positions]
  );

  const roles = useMemo(
    () => roleData?.data?.roles || [],
    [roleData?.data?.roles]
  );

  const groups = useMemo(
    () => groupData?.data?.groups || [],
    [groupData?.data?.groups]
  );
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
      const objectPayload = {
        ...payload,
        gender: payload.gender?.value,
        nationality: payload.nationality?.value,
        religion: payload.religion?.value,
        maritalStatus: payload.maritalStatus?.value,
        positionId: Number(payload.positionId?.value),
        roleId: Number(payload.roleId?.value),
        groupId: Number(payload.groupId?.value),
      };
      await createEmployee(objectPayload).unwrap();
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

  if (isLoadingPosition || isLoadingRole || isLoading) return <Loading />;
  if (isError) return <Error404 />;

  return (
    <Fragment>
      <div className="pb-10 -mt-5 overflow-auto">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Ubah Informasi Karyawan
              </h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Formulir perubahan informasi karyawan.
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
                  <CustomSelect
                    label="Jenis Kelamin"
                    required={true}
                    className="w-full"
                    placeholder="Pilih Jenis Kelamin"
                    size="sm"
                    value={
                      payload.gender
                        ? {
                            label: payload?.gender?.label || "",
                            value: payload?.gender?.value || "",
                          }
                        : null
                    }
                    onChange={(value) => handleChange("gender", value)}
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
                    error={errors.gender}
                  />

                  <CustomSelect
                    label="Kebangsaan"
                    required={true}
                    className="w-full"
                    placeholder="Pilih Kebangsaan"
                    size="sm"
                    value={
                      payload.nationality
                        ? {
                            label: payload?.nationality?.label || "",
                            value: payload?.nationality?.value || "",
                          }
                        : null
                    }
                    onChange={(value) => handleChange("nationality", value)}
                    optionValue={nationalities}
                    error={errors.nationality}
                  />
                  <CustomSelect
                    label="Agama"
                    required={true}
                    className="w-full"
                    placeholder="Pilih Agama"
                    size="sm"
                    value={
                      payload.religion
                        ? {
                            label: payload?.religion?.label || "",
                            value: payload?.religion?.value || "",
                          }
                        : null
                    }
                    onChange={(value) => handleChange("religion", value)}
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
                    error={errors.religion}
                  />
                  <CustomSelect
                    label="Status Pernikahan"
                    required={true}
                    className="w-full"
                    placeholder="Pilih Status Pernikahan"
                    size="sm"
                    value={
                      payload.maritalStatus
                        ? {
                            label: payload?.maritalStatus?.label || "",
                            value: payload?.maritalStatus?.value || "",
                          }
                        : null
                    }
                    onChange={(value) => handleChange("maritalStatus", value)}
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
                    error={errors.maritalStatus}
                  />
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

                  <CustomSelect
                    label="Jabatan"
                    required={true}
                    className="w-full"
                    placeholder="Pilih Jabatan"
                    size="sm"
                    value={
                      payload.positionId
                        ? {
                            label: payload?.positionId?.label || "",
                            value: payload?.positionId?.value || "",
                          }
                        : null
                    }
                    onChange={(value) => handleChange("positionId", value)}
                    optionValue={positions?.map((position: any) => ({
                      label: position.name,
                      value: position.id,
                    }))}
                    error={errors.positionId}
                  />

                  <CustomSelect
                    label="Role"
                    required={true}
                    className="w-full"
                    placeholder="Pilih Role"
                    size="sm"
                    value={
                      payload.roleId
                        ? {
                            label: payload?.roleId?.label || "",
                            value: payload?.roleId?.value || "",
                          }
                        : null
                    }
                    onChange={(value) => handleChange("roleId", value)}
                    optionValue={roles?.map((role: any) => ({
                      label: role.name,
                      value: role.id,
                    }))}
                    error={errors.roleId}
                  />
                  <CustomSelect
                    label="Grup"
                    required={true}
                    className="w-full"
                    placeholder="Pilih Grup"
                    size="sm"
                    value={
                      payload.groupId
                        ? {
                            label: payload?.groupId?.label || "",
                            value: payload?.groupId?.value || "",
                          }
                        : null
                    }
                    onChange={(value) => handleChange("groupId", value)}
                    optionValue={groups?.map((group: any) => ({
                      label: group.name,
                      value: group.id,
                    }))}
                    error={errors.groupId}
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
