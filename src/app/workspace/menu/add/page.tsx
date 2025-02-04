"use client";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  ConfirmationModal,
  InputText,
  Select,
  SuccessModal,
  Button,
} from "@/components/atoms";
import { useCreateMenuMutation } from "@/services/api";

export default function AddNewMenu() {
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
  const [createMenu] = useCreateMenuMutation();

  const handleChange = (key: string, value: any) => {
    return setPayload({
      ...payload,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    setOpenModal(true);
  };

  const _executeSubmit = async () => {
    try {
      await createMenu(payload).unwrap();
      setStatusMessage({
        message: "Menu submitted successfully!",
        type: "Success",
      });
      setOpenModal(false);
      setSuccessModal(true);
      setTimeout(() => {
        router.push("/workspace/menu");
      }, 3000);
    } catch (error) {
      setOpenModal(false);
      setStatusMessage({
        message: "Error submitting menu",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Error submitting menu:", error);
    }
  };
  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Menu</h1>
            <p className="text-base text-gray-600 px-0.5  pb-3">
              Add new menu description.
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex max-w-full min-w-fit">
          <Card
            styleHeader={"justify-start"}
            contentHeader={<p className="font-semibold">Menu Information</p>}
            styleFooter={"justify-end"}
            contentFooter={
              <div className="flex justify-end gap-2 ">
                <Button
                  type="pill"
                  appearance="light"
                  text="Cancel"
                  onClick={() => router.back()}
                />
                <Button type="pill" appearance="warning" text="Save as draft" />
                <Button
                  type="pill"
                  appearance="primary"
                  text="Submit"
                  onClick={() => handleSubmit()}
                />
              </div>
            }
          >
            <div className="flex w-[1300px] gap-4">
              <div className="w-[600px] space-y-4 my-4 mr-10">
                <InputText
                  type="text"
                  label="Menu Name"
                  required={true}
                  placeholder="Menu Name"
                  className="w-[600px]"
                  value={payload.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <InputText
                  type="text"
                  label="Description"
                  required={true}
                  placeholder="Description"
                  className="w-[600px]"
                  value={payload.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />

                <InputText
                  type="text"
                  label="URL Menu"
                  required={true}
                  placeholder="URL Menu"
                  className="w-[600px]"
                  value={payload.urlMenu}
                  onChange={(e) => handleChange("urlMenu", e.target.value)}
                />
                <InputText
                  type="text"
                  label="Icon Menu"
                  required={true}
                  placeholder="Icon Menu"
                  className="w-[600px]"
                  value={payload.iconMenu}
                  onChange={(e) => handleChange("iconMenu", e.target.value)}
                />
                {/* <div className={`relative w-[600px]`}>
                  <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                    <label
                      className="form-label max-w-44"
                      htmlFor={"Icon Menu"}
                    >
                      {"Icon Menu"}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="relative w-full">
                      <InputFile />
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="w-[600px] space-y-4 my-4">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                  <label className="form-label max-w-44">
                    Category
                    <span className="text-danger">*</span>
                  </label>
                  <Select
                    className="w-full"
                    value={payload.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    optionValue={[
                      { label: "SIAP Backoffice", value: "Backoffice" },
                      { label: "SIAP Administration", value: "SIAP-ADMIN" },
                      { label: "SIGAP", value: "Sigap" },
                    ]}
                  />
                </div>
                <InputText
                  type="number"
                  label="Menu Order Number"
                  required={true}
                  placeholder="Menu Order Number"
                  className="w-[600px]"
                  value={String(payload.orderingNumber)}
                  onChange={(e) =>
                    handleChange("orderingNumber", parseInt(e.target.value))
                  }
                />

                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 w-[600px]">
                  <label className="form-label max-w-44">
                    Parent Menu
                    <span className="text-danger">*</span>
                  </label>
                  <Select
                    className="w-full"
                    optionValue={[
                      { label: "Parent 1", value: "parent-1" },
                      { label: "Parent 2", value: "parent-2" },
                      { label: "Parent 3", value: "parent-3" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Card>
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
