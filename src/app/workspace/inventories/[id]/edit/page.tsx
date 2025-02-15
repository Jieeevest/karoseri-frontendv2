"use client";
import { Card, InputText } from "@/components/atoms"; // Assuming SelectInput is a custom component for dropdowns
import DefaultButton from "@/components/atoms/Button";
import Error404 from "@/components/molecules/Error404";
import Loading from "@/components/molecules/Loading";
import {
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation,
} from "@/services/api";
import { useRouter, useParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

export default function EditInventory() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Assuming you pass the ID of the inventory item to be edited through the URL

  // State for inventory item
  const [payload, setPayload] = useState({
    name: "",
    amount: 0,
    typeId: 0,
    categoryId: 0,
    locationId: 0,
    minimumStock: 0,
    description: "",
  });

  const {
    data: inventoryData,
    error: inventoryError,
    isLoading: inventoryLoading,
  } = useGetInventoryByIdQuery(Number(id));
  const [updateInventory] = useUpdateInventoryMutation();

  // Handle change in form fields
  const handleChange = (key: string, value: any) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  // Set initial form values when inventory data is fetched
  useEffect(() => {
    if (inventoryData?.data) {
      const currentData = inventoryData?.data;
      setPayload({
        name: currentData.name || "",
        amount: currentData.amount || 0,
        typeId: currentData.typeId || 0,
        categoryId: currentData.categoryId || 0,
        locationId: currentData.locationId || 0,
        minimumStock: currentData.minimumStock || 0,
        description: currentData.description || "",
      });
    }
  }, [inventoryData]);

  // Handle form submission to update inventory
  const handleSubmit = async () => {
    try {
      await updateInventory({
        id: Number(id),
        updates: { ...payload },
      }).unwrap();
      router.push("/workspace/inventory");
    } catch (error) {
      console.error("Error updating inventory item:", error);
    }
  };

  // Handle loading and error states
  if (inventoryLoading) return <Loading />;
  if (inventoryError) return <Error404 />;

  return (
    <Fragment>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Edit Inventory Item
            </h1>
            <p className="text-base text-gray-600 px-0.5 pb-3">
              Edit the inventory item details.
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
        <div className="flex max-w-full min-w-fit">
          <Card
            styleHeader={"justify-start"}
            contentHeader={
              <p className="font-semibold">Inventory Information</p>
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
                  appearance="primary"
                  text="Update"
                  onClick={handleSubmit}
                />
              </div>
            }
          >
            <div className="w-[1200px] space-y-4 my-4">
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
    </Fragment>
  );
}
