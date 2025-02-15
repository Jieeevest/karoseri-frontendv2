"use client";
import {
  Card,
  ConfirmationModal,
  InputText,
  SuccessModal,
} from "@/components/atoms";
import DefaultButton from "@/components/atoms/Button";
import { useCreateInventoryMutation } from "@/services/api"; // Assuming a `useCreateInventoryMutation` hook exists
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

export default function AddNewInventory() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [payload, setPayload] = useState({
    name: "",
    amount: 0,
    typeId: 0,
    categoryId: 0,
    locationId: 0,
    minimumStock: 0,
    description: "",
  });

  const [createInventory] = useCreateInventoryMutation();

  // Handle change in form fields
  const handleChange = (key: string, value: any) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setOpenModal(true);
  };

  // Execute submit logic
  const _executeSubmit = async () => {
    try {
      await createInventory(payload).unwrap();
      setStatusMessage({
        message: "Inventory item submitted successfully!",
        type: "Success",
      });
      setSuccessModal(true);
      router.push("/workspace/inventory");
    } catch (error) {
      setStatusMessage({
        message: "Error submitting inventory item",
        type: "Error",
      });
      setSuccessModal(true);
      console.error("Error submitting inventory item:", error);
    }
  };

  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Add New Inventory Item
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Add new inventory item details.
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex max-w-full min-w-fit">
          <Card
            styleHeader={"justify-start"}
            contentHeader={
              <p className="font-semibold">Inventory Item Information</p>
            }
            styleFooter={"justify-end"}
            contentFooter={
              <div className="flex justify-end gap-2">
                <DefaultButton
                  type="pill"
                  appearance="light"
                  text="Cancel"
                  onClick={() => router.back()}
                />
                <DefaultButton
                  type="pill"
                  appearance="warning"
                  text="Save as Draft"
                />
                <DefaultButton
                  type="pill"
                  appearance="primary"
                  text="Submit"
                  onClick={() => handleSubmit()}
                />
              </div>
            }
          >
            <div className="w-[1300px] space-y-4 my-4">
              {/* Inventory Name */}
              <InputText
                type="text"
                label="Inventory Item Name"
                required={true}
                placeholder="Item Name"
                className="w-[600px]"
                value={payload.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              {/* Amount */}
              <InputText
                type="number"
                label="Amount"
                required={true}
                placeholder="Amount"
                className="w-[600px]"
                value={String(payload.amount)}
                onChange={(e) => handleChange("amount", e.target.value)}
              />

              {/* Type */}
              {/* <div className="w-[600px]">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={payload.typeId}
                  onChange={(e) => handleChange("typeId", e.target.value)}
                >
                  <option value={0}>Select Type</option>
                  {types?.data?.map((type: any) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Category */}
              {/* <div className="w-[600px]">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={payload.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                >
                  <option value={0}>Select Category</option>
                  {categories?.data?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Location */}
              {/* <div className="w-[600px]">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={payload.locationId}
                  onChange={(e) => handleChange("locationId", e.target.value)}
                >
                  <option value={0}>Select Location</option>
                  {locations?.data?.map((location: any) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Minimum Stock */}
              <InputText
                type="number"
                label="Minimum Stock"
                required={true}
                placeholder="Minimum Stock"
                className="w-[600px]"
                value={String(payload.minimumStock)}
                onChange={(e) => handleChange("minimumStock", e.target.value)}
              />

              {/* Description */}
              <InputText
                type="text"
                label="Description"
                placeholder="Description"
                className="w-[600px]"
                value={payload.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeSubmit()}
        />
      )}

      {/* Success Modal */}
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
