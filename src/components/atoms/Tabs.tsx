"use client";
import React, { useState } from "react";

interface TabsProps {
  tabs?: Array<{ label: string; content: React.ReactNode }>;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs = [], className = "" }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`tabs-container ${className}`}>
      {/* Tab List */}
      <div
        className="tab-list flex space-x-4 border-b"
        role="tablist"
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-item py-2 px-4 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="tab-panels mt-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-panel ${activeTab === index ? "block" : "hidden"}`}
            id={`tab-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
