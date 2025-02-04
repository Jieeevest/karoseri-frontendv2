import React from "react";
import InputText from "./InputText";
import DefaultButton from "./Button";
import Select from "./Select";
import Pagination from "./Pagination";
import PaginationData from "../molecules/Pagination";

// Define types for column and row data
interface Column {
  label: string;
  tooltip?: string;
  icon?: string;
}

interface DataTableProps {
  title?: string;
  className?: string;
  columns: Column[]; // Array of columns with label, tooltip, and optional icon
  data: any;
  filter?: {
    keyword: string;
    status: string;
    pageSize: number;
    page: number;
    totalData: number;
  };
  setFilter?: (filter: any) => void;
  pageSizeOptions?: number[]; // Optional page size options for pagination
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  className = "",
  columns,
  data,
  filter,
  setFilter,
  pageSizeOptions = [1, 2, 5, 10, 25, 50], // Default page size options
}) => {
  return (
    <div className={`relative ${className} `}>
      <div className="grid">
        <div className="card card-grid min-w-full shadow-sm border-[1px] border-gray-300">
          <div className="card-header py-5 flex-wrap shadow-sm border-b-[1px] border-gray-300">
            <h3 className="card-title">{title || "Data Table"}</h3>
            <div className="flex gap-2">
              <InputText
                type="text"
                placeholder="Search"
                onChange={(e) =>
                  setFilter && setFilter({ ...filter, keyword: e.target.value })
                }
                value={filter?.keyword || ""}
              />
              <Select
                className="w-40"
                onChange={(e) =>
                  setFilter && setFilter({ ...filter, status: e.target.value })
                }
                value={filter?.status || ""}
                optionValue={[
                  { label: "Active", value: "active" },
                  { label: "Pending", value: "pending" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
              <DefaultButton
                type="pill"
                appearance="primary"
                text="Filter"
                icon="ki-filter"
              />
            </div>
          </div>
          <div className="card-body">
            <div
              data-datatable="true"
              data-datatable-page-size="5"
              data-datatable-state-save="true"
              id="datatable_1"
            >
              <div className="scrollable-x-auto">
                <table
                  className="table table-auto table-border border-[1px] border-gray-300"
                  data-datatable-table="true"
                >
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th key={index} className="w-[185px] text-center">
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
                            {column.label && (
                              <span className="sort-icon"></span>
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length ? (
                      data.map((row: any, rowIndex: number) => (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => (
                            <td key={colIndex} className="text-center ">
                              {row[column.label] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="text-center font-semibold"
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium shadow-sm border-t-[1px] border-gray-300">
                <div className="flex items-center gap-2">
                  Show
                  <select
                    className="select select-sm w-16"
                    data-datatable-size="true"
                    name="perpage"
                    onChange={(e) =>
                      setFilter &&
                      setFilter({ ...filter, pageSize: e.target.value })
                    }
                    value={filter?.pageSize || pageSizeOptions[0]}
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  per page
                </div>
                <div className="flex items-center gap-4">
                  {/* Pagination */}
                  <PaginationData
                    totalItems={filter?.totalData ? filter.totalData : 5}
                    pageSize={filter?.pageSize ? filter.pageSize : 5}
                    currentPage={filter?.page ? filter.page : 1}
                    setFilter={setFilter ? setFilter : () => {}}
                    pageSizeOptions={pageSizeOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
