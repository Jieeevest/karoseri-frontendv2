"use client";
import { Card, InputCheckbox, InputText } from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

const columns = [
  { label: "Menu Name", tooltip: "", icon: "" },
  { label: "View", tooltip: "", icon: "" },
  { label: "Create", tooltip: "", icon: "" },
  { label: "Delete", tooltip: "", icon: "" },
  { label: "Update", tooltip: "", icon: "" },
];

const data = [
  {
    "Menu Name": (
      <div className="flex items-center space-x-4">
        <div>
          <Image src="/siap-logo-new.png" alt="logo" width={20} height={20} />
        </div>
        <div className="text-left">
          <p className="font-bold">Employee Management</p>
          <p className="font-light">Sistem Administrasi Pegawai (SIAP)</p>
        </div>
      </div>
    ),
    View: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Create: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Delete: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Update: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
  },
  {
    "Menu Name": (
      <div className="flex items-center space-x-4">
        <div>
          <Image src="/siap-logo-new.png" alt="logo" width={20} height={20} />
        </div>
        <div className="text-left">
          <p className="font-bold">Leave Management Management</p>
          <p className="font-light">Sistem Administrasi Pegawai (SIAP)</p>
        </div>
      </div>
    ),
    View: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Create: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Delete: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Update: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
  },
  {
    "Menu Name": (
      <div className="flex items-center space-x-4">
        <div>
          <Image src="/siap-logo-new.png" alt="logo" width={20} height={20} />
        </div>
        <div className="text-left">
          <p className="font-bold">Article Management</p>
          <p className="font-light">Sistem Administrasi Pegawai (SIAP)</p>
        </div>
      </div>
    ),
    View: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Create: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Delete: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Update: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
  },
  {
    "Menu Name": (
      <div className="flex items-center space-x-4">
        <div className="scale-150">
          <Image
            src="/siap-payment-new.png"
            alt="logo"
            width={20}
            height={20}
          />
        </div>
        <div className="text-left">
          <p className="font-bold">Reimbursement Management</p>
          <p className="font-light">Payment Apps</p>
        </div>
      </div>
    ),
    View: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Create: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Delete: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
    Update: (
      <div className="justify-center items-center text-center ml-8">
        <InputCheckbox onChange={() => console.log()} />
      </div>
    ),
  },
];

export default function EditRole() {
  const router = useRouter();
  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Edit Information Role
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Edit information role description.
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex max-w-full min-w-fit">
          <Card
            styleHeader={"justify-start"}
            contentHeader={<p className="font-semibold">Role Information</p>}
            styleFooter={"justify-end"}
            contentFooter={
              <div className="flex justify-end gap-2 ">
                <DefaultButton
                  type="pill"
                  appearance="light"
                  text="Cancel"
                  onClick={() => router.back()}
                />
                <DefaultButton type="pill" appearance="primary" text="Update" />
              </div>
            }
          >
            <div className="w-[1200px] space-y-4 my-4">
              <InputText
                type="text"
                label="Role Name"
                required={true}
                placeholder="Role Name"
                className="w-[600px]"
              />
              <InputText
                type="text"
                label="Description"
                required={true}
                placeholder="Description"
                className="w-[600px]"
              />
              <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-44">
                  Authorization Menu
                  <span className="text-danger">*</span>
                </label>
                <div
                  data-datatable="true"
                  data-datatable-page-size="5"
                  data-datatable-state-save="true"
                  id="datatable_1"
                >
                  <div className="scrollable-x-auto border rounded-lg">
                    <table
                      className="table table-auto"
                      data-datatable-table="true"
                    >
                      <thead>
                        <tr>
                          {columns.map((column, index) => (
                            <th
                              key={index}
                              className={`${
                                index == 0 ? "w-[300px]" : "w-[120px]"
                              } text-center`}
                            >
                              <span className="sort">
                                <span className="sort-label">
                                  {column.tooltip ? (
                                    <span
                                      className="pt-px"
                                      data-tooltip="true"
                                      data-tooltip-offset="0, 5px"
                                      data-tooltip-placement="top"
                                    >
                                      <i className={column.icon} />
                                      <span
                                        className="tooltip max-w-48"
                                        data-tooltip-content="true"
                                      >
                                        {column.tooltip}
                                      </span>
                                    </span>
                                  ) : (
                                    column.label
                                  )}
                                </span>
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row: any, rowIndex: number) => (
                          <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                              <td key={colIndex} className="text-center">
                                {row[column.label] || "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}
