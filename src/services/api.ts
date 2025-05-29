import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define interfaces for data structures
interface PaginatedResponse<T> {
  data: {
    orderBy: string;
    orderDirection: string;
    pageNumber: number;
    pageSize: number;
    totalData: number;
    roles: T[];
    inventory: T[];
    employees: T[];
    requests: T[];
    suppliers: T[];
    positions: T[];
    groups: T[];
    locations: T[];
    vehicles: T[];
    activityLogs: T[];
    inbounds: T[];
    outbounds: T[];
    categories: T[];
    billOfMaterials: T[];
    projects: T[];
  };
}

export interface RoleData {
  id: number;
  name: string;
  description: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeData {
  id: number;
  nik: string;
  fullName: string | null;
  email: string;
  phoneNumber: string | null;
  password: string | null;
  employeeNumber: string | null;
  profileImage: string | null;
  joinedDate: string | null;
  resignedDate: string | null;
  homeAddress: string | null;
  birthPlace: string | null;
  birthDate: string;
  gender: string | null;
  nationality: string | null;
  religion: string | null;
  maritalStatus: string | null;
  positionId: number | null;
  roleId: number | null;
  role: RoleData;
  groupId: number | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryData {
  id: number;
  name: string | null;
  amount: number;
  type: string | null;
  category: string | null;
  location: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RequestData {
  id: number;
  incomingDate: string;
  supplier: string;
  submitter: string;
  approver: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface InboundData {
  id: number;
  incomingDate: string;
  deliveryNumber: string;
  supplier: string;
  submitter: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}

export interface OutboundData {
  id: number;
  outcomingDate: string;
  deliveryNumber: string;
  supplier: string;
  submitter: string;
  approver: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierData {
  id: number;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PositionData {
  id: number;
  name: string | null;
  description: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GroupData {
  id: number;
  name: string | null;
  description: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LocationData {
  id: number;
  name: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleData {
  id: number;
  showroomName: string | null;
  ownerName: string | null;
  expeditionName: string | null;
  merk: string | null;
  series: string | null;
  color: string | null;
  type: string | null;
  chasisNumber: string | null;
  machineNumber: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface BillOfMaterialsData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLogData {
  id: number;
  activity: string;
  timestamp: string;
  employeeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseRoleData {
  data: {
    id: number;
    name: string;
    description: string | null;
    status: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseEmployeeData {
  data: {
    id: number;
    name: string | null;
    amount: number;
    type: string | null;
    category: string | null;
    location: string | null;
    status: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseInventoryData {
  data: {
    id: number;
    name: string | null;
    amount: number;
    typeId: number;
    type: string | null;
    categoryId: number;
    category: string | null;
    locationId: number;
    location: string | null;
    status: string | null;
    minimumStock: number | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponsePositionData {
  data: {
    id: number;
    name: string | null;
    description: string | null;
    status: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseGroupData {
  data: {
    id: number;
    name: string | null;
    description: string | null;
    status: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseLocationData {
  data: {
    id: number;
    name: string | null;
    description: string | null;
    status: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseRequestData {
  data: {
    id: number;
    incomingDate: string;
    supplier: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseInboundData {
  data: {
    id: number;
    incomingDate: string;
    deliveryNumber: string;
    supplier: string;
    submitter: string;
    receiver: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseOutboundData {
  data: {
    id: number;
    outcomingDate: string;
    deliveryNumber: string;
    supplier: string;
    submitter: string;
    approver: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseSupplierData {
  data: {
    id: number;
    name: string | null;
    phoneNumber: string | null;
    email: string | null;
    bank: string | null;
    bankNumber: string | null;
    bankOwner: string | null;
    phoneNumberAlt: string | null;
    homeAddress: string | null;
    totalDebt: number | null;
    category: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseVehicleData {
  data: {
    id: number;
    showroomName: string | null;
    ownerName: string | null;
    expeditionName: string | null;
    merk: string | null;
    series: string | null;
    color: string | null;
    type: string | null;
    chasisNumber: string | null;
    machineNumber: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseCategoryData {
  data: {
    id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseBillOfMaterialsData {
  data: {
    id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseProjectData {
  data: {
    id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Roles",
    "Employees",
    "Positions",
    "Groups",
    "Inventory",
    "Requests",
    "Suppliers",
    "Locations",
    "Vehicles",
    "ActivityLogs",
    "Inbounds",
    "Outbounds",
    "Categories",
    "BillOfMaterials",
    "Projects",
  ],
  endpoints: (builder) => ({
    /** Roles Endpoint */
    getRoles: builder.query<
      PaginatedResponse<RoleData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/roles?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Roles"],
    }),
    getRoleById: builder.query<ResponseRoleData, number>({
      query: (id) => `/roles/${id}`,
      providesTags: ["Roles"],
    }),
    createRole: builder.mutation<void, Partial<RoleData>>({
      query: (newRole) => ({
        url: "/roles",
        method: "POST",
        body: JSON.stringify(newRole),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Roles"],
    }),
    updateRole: builder.mutation<
      void,
      { id: number; updates: Partial<RoleData> }
    >({
      query: ({ id, updates }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteRole: builder.mutation<void, number>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),

    /** Employees Endpoint */
    getEmployees: builder.query<
      PaginatedResponse<EmployeeData>,
      { status: string; pageSize: number; page: number }
    >({
      query: ({ status, pageSize, page }) => {
        let queryString = `/employees?status=${status}&`;

        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Employees"],
    }),
    getEmployeeById: builder.query<ResponseEmployeeData, number>({
      query: (id) => `/employees/${id}`,
      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation<void, Partial<EmployeeData>>({
      query: (newEmployee) => ({
        url: "/employees",
        method: "POST",
        body: JSON.stringify(newEmployee),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation<
      void,
      { id: number; updates: Partial<EmployeeData> }
    >({
      query: ({ id, updates }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),

    /** Inventory Endpoint */
    getInventory: builder.query<
      PaginatedResponse<InventoryData>,
      {
        keyword: string;
        status: string;
        pageSize: number;
        page: number;
      }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/inventory?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `category=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Inventory"],
    }),
    getInventoryById: builder.query<ResponseInventoryData, number>({
      query: (id) => `/inventory/${id}`,
      providesTags: ["Inventory"],
    }),
    createInventory: builder.mutation<void, Partial<InventoryData>>({
      query: (newInventory) => ({
        url: "/inventory",
        method: "POST",
        body: JSON.stringify(newInventory),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Inventory"],
    }),
    updateInventory: builder.mutation<
      void,
      { id: number; updates: Partial<InventoryData> }
    >({
      query: ({ id, updates }) => ({
        url: `/inventory/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteInventory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),

    /** Request Endpoint */
    getRequests: builder.query<
      PaginatedResponse<RequestData>,
      { keyword: string; pageSize: number; page: number }
    >({
      query: ({ keyword, pageSize, page }) => {
        let queryString = "/requests?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Requests"],
    }),
    getRequestById: builder.query<ResponseRequestData, number>({
      query: (id) => `/requests/${id}`,
      providesTags: ["Requests"],
    }),
    createRequest: builder.mutation<void, Partial<RequestData>>({
      query: (newRequest) => ({
        url: "/requests",
        method: "POST",
        body: JSON.stringify(newRequest),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Requests"],
    }),
    updateRequest: builder.mutation<
      void,
      { id: number; updates: Partial<RequestData> }
    >({
      query: ({ id, updates }) => ({
        url: `/requests/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Requests"],
    }),
    deleteRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: `/requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests"],
    }),

    getInbounds: builder.query<
      PaginatedResponse<InboundData>,
      { keyword: string; pageSize: number; page: number }
    >({
      query: ({ keyword, pageSize, page }) => {
        let queryString = "/inbounds?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Inbounds"],
    }),
    getInboundById: builder.query<ResponseInboundData, number>({
      query: (id) => `/inbounds/${id}`,
      providesTags: ["Inbounds"],
    }),
    createInbound: builder.mutation<void, Partial<InboundData>>({
      query: (newRequest) => ({
        url: "/inbounds",
        method: "POST",
        body: JSON.stringify(newRequest),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Inbounds"],
    }),
    updateInbound: builder.mutation<
      void,
      { id: number; updates: Partial<InboundData> }
    >({
      query: ({ id, updates }) => ({
        url: `/inbounds/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Inbounds"],
    }),
    deleteInbound: builder.mutation<void, number>({
      query: (id) => ({
        url: `/inbounds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inbounds"],
    }),

    getOutbounds: builder.query<
      PaginatedResponse<OutboundData>,
      { keyword: string; pageSize: number; page: number }
    >({
      query: ({ keyword, pageSize, page }) => {
        let queryString = "/outbounds?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Outbounds"],
    }),
    getOutboundById: builder.query<ResponseOutboundData, number>({
      query: (id) => `/outbounds/${id}`,
      providesTags: ["Outbounds"],
    }),
    createOutbound: builder.mutation<void, Partial<OutboundData>>({
      query: (newRequest) => ({
        url: "/outbounds",
        method: "POST",
        body: JSON.stringify(newRequest),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Outbounds"],
    }),
    updateOutbound: builder.mutation<
      void,
      { id: number; updates: Partial<OutboundData> }
    >({
      query: ({ id, updates }) => ({
        url: `/outbounds/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Outbounds"],
    }),
    deleteOutbound: builder.mutation<void, number>({
      query: (id) => ({
        url: `/outbounds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Outbounds"],
    }),

    /** Suppliers Endpoint */
    getSuppliers: builder.query<
      PaginatedResponse<SupplierData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, pageSize, page, status }) => {
        let queryString = "/suppliers?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Suppliers"],
    }),
    getSupplierById: builder.query<ResponseSupplierData, number>({
      query: (id) => `/suppliers/${id}`,
      providesTags: ["Suppliers"],
    }),
    createSupplier: builder.mutation<void, Partial<SupplierData>>({
      query: (newSupplier) => ({
        url: "/suppliers",
        method: "POST",
        body: JSON.stringify(newSupplier),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Suppliers"],
    }),
    updateSupplier: builder.mutation<
      void,
      { id: number; updates: Partial<SupplierData> }
    >({
      query: ({ id, updates }) => ({
        url: `/suppliers/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Suppliers"],
    }),
    deleteSupplier: builder.mutation<void, number>({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),

    /** Position Endpoint */
    getPositions: builder.query<
      PaginatedResponse<PositionData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/positions?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Positions"],
    }),
    getPositionById: builder.query<ResponsePositionData, number>({
      query: (id) => `/positions/${id}`,
      providesTags: ["Positions"],
    }),
    createPosition: builder.mutation<void, Partial<PositionData>>({
      query: (newPosition) => ({
        url: "/positions",
        method: "POST",
        body: JSON.stringify(newPosition),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Positions"],
    }),
    updatePosition: builder.mutation<
      void,
      { id: number; updates: Partial<PositionData> }
    >({
      query: ({ id, updates }) => ({
        url: `/positions/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Positions"],
    }),
    deletePosition: builder.mutation<void, number>({
      query: (id) => ({
        url: `/positions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Positions"],
    }),

    /** Group Endpoint */
    getGroups: builder.query<
      PaginatedResponse<GroupData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/groups?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Groups"],
    }),
    getGroupById: builder.query<ResponseGroupData, number>({
      query: (id) => `/groups/${id}`,
      providesTags: ["Groups"],
    }),
    createGroup: builder.mutation<void, Partial<GroupData>>({
      query: (newGroup) => ({
        url: "/groups",
        method: "POST",
        body: JSON.stringify(newGroup),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Groups"],
    }),
    updateGroup: builder.mutation<
      void,
      { id: number; updates: Partial<GroupData> }
    >({
      query: ({ id, updates }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Groups"],
    }),
    deleteGroup: builder.mutation<void, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Groups"],
    }),

    /** Location Endpoint */
    getLocations: builder.query<
      PaginatedResponse<LocationData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/locations?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Locations"],
    }),
    getLocationById: builder.query<ResponseLocationData, number>({
      query: (id) => `/locations/${id}`,
      providesTags: ["Locations"],
    }),
    createLocation: builder.mutation<void, Partial<LocationData>>({
      query: (newLocation) => ({
        url: "/locations",
        method: "POST",
        body: JSON.stringify(newLocation),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Locations"],
    }),
    updateLocation: builder.mutation<
      void,
      { id: number; updates: Partial<GroupData> }
    >({
      query: ({ id, updates }) => ({
        url: `/locations/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Locations"],
    }),
    deleteLocation: builder.mutation<void, number>({
      query: (id) => ({
        url: `/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Locations"],
    }),

    /** Vechicle Endpoint */
    getVehicles: builder.query<
      PaginatedResponse<VehicleData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/vehicles?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Vehicles"],
    }),
    getVehicleById: builder.query<ResponseVehicleData, number>({
      query: (id) => `/vehicles/${id}`,
      providesTags: ["Vehicles"],
    }),
    createVehicle: builder.mutation<void, Partial<VehicleData>>({
      query: (newVehicle) => ({
        url: "/vehicles",
        method: "POST",
        body: JSON.stringify(newVehicle),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Vehicles"],
    }),
    updateVehicle: builder.mutation<
      void,
      { id: number; updates: Partial<VehicleData> }
    >({
      query: ({ id, updates }) => ({
        url: `/vehicles/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Vehicles"],
    }),
    deleteVehicle: builder.mutation<void, number>({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicles"],
    }),

    /** Category Endpoint */
    getCategories: builder.query<
      PaginatedResponse<CategoryData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/karoseri-categories?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query<ResponseCategoryData, number>({
      query: (id) => `/karoseri-categories/${id}`,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<void, Partial<CategoryData>>({
      query: (newCategory) => ({
        url: "/karoseri-categories",
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<
      void,
      { id: number; updates: Partial<CategoryData> }
    >({
      query: ({ id, updates }) => ({
        url: `/karoseri-categories/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/karoseri-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    /** Bill Of Materials Endpoint */
    getBillOfMaterials: builder.query<
      PaginatedResponse<BillOfMaterialsData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/billofmaterials?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["BillOfMaterials"],
    }),
    getBillOfMaterialById: builder.query<ResponseBillOfMaterialsData, number>({
      query: (id) => `/billofmaterials/${id}`,
      providesTags: ["BillOfMaterials"],
    }),
    createBillOfMaterial: builder.mutation<void, Partial<BillOfMaterialsData>>({
      query: (newBillOfMaterials) => ({
        url: "/billofmaterials",
        method: "POST",
        body: JSON.stringify(newBillOfMaterials),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["BillOfMaterials"],
    }),
    updateBillOfMaterial: builder.mutation<
      void,
      { id: number; updates: Partial<BillOfMaterialsData> }
    >({
      query: ({ id, updates }) => ({
        url: `/billofmaterials/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["BillOfMaterials"],
    }),
    deleteBillOfMaterial: builder.mutation<void, number>({
      query: (id) => ({
        url: `/billofmaterials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BillOfMaterials"],
    }),

    /** Projects Endpoint */
    getProjects: builder.query<
      PaginatedResponse<ProjectData>,
      { keyword: string; status: string; pageSize: number; page: number }
    >({
      query: ({ keyword, status, pageSize, page }) => {
        let queryString = "/projects?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Projects"],
    }),
    getProjectById: builder.query<ResponseProjectData, number>({
      query: (id) => `/projects/${id}`,
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<void, Partial<ProjectData>>({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: JSON.stringify(newProject),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<
      void,
      { id: number; updates: Partial<ProjectData> }
    >({
      query: ({ id, updates }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    /** Activity Logs Endpoint */
    getActivityLogs: builder.query<
      PaginatedResponse<ActivityLogData>,
      { employeeId: number; pageSize: number; page: number }
    >({
      query: ({ employeeId, pageSize, page }) => {
        let queryString = `/activity-logs?employeeId=${employeeId}&`;

        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["ActivityLogs"],
    }),
  }),
});

export const {
  //roles
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  //employees
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  //inventory
  useGetInventoryQuery,
  useGetInventoryByIdQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
  //requests
  useGetRequestsQuery,
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
  //inbounds
  useGetInboundsQuery,
  useGetOutboundByIdQuery,
  useCreateInboundMutation,
  useUpdateInboundMutation,
  useDeleteInboundMutation,
  //outbounds
  useGetOutboundsQuery,
  useGetInboundByIdQuery,
  useCreateOutboundMutation,
  useUpdateOutboundMutation,
  useDeleteOutboundMutation,
  //suppliers
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  //positions
  useGetPositionsQuery,
  useGetPositionByIdQuery,
  useCreatePositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
  //groups
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  //locations
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  //vehicles
  useGetVehiclesQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  //categories
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  //billofmaterials
  useGetBillOfMaterialsQuery,
  useGetBillOfMaterialByIdQuery,
  useCreateBillOfMaterialMutation,
  useUpdateBillOfMaterialMutation,
  useDeleteBillOfMaterialMutation,
  //projects
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,

  //activity logs
  useGetActivityLogsQuery,
} = api;
