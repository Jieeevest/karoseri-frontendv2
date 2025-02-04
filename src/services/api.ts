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
    members: T[];
    packages: T[];
    menu: T[];
    teams: T[];
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
  fullName: string | null;
  email: string;
  phoneNumber: string | null;
  role: string;
  position: string;
  group: string;
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
  status: string;
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

export interface ActivityLogData {
  id: number;
  activity: string;
  timestamp: string;
  employeeId: number;
  createdAt: string;
  updatedAt: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
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
    "ActivityLogs",
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
        category: string;
        type: string;
        pageSize: number;
        page: number;
      }
    >({
      query: ({ keyword, category, type, pageSize, page }) => {
        let queryString = "/inventory?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (category) queryString += `category=${category}&`;
        if (type) queryString += `type=${type}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
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

    /** Suppliers Endpoint */
    getSuppliers: builder.query<
      PaginatedResponse<SupplierData>,
      { keyword: string; pageSize: number; page: number }
    >({
      query: ({ keyword, pageSize, page }) => {
        let queryString = "/suppliers?";

        if (keyword) queryString += `keyword=${keyword}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;

        return queryString;
      },
      providesTags: ["Suppliers"],
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
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetInventoryQuery,
  useCreateInventoryMutation,
  useGetRequestsQuery,
  useGetSuppliersQuery,
  useGetPositionsQuery,
  useGetGroupsQuery,
  useGetActivityLogsQuery,
} = api;
