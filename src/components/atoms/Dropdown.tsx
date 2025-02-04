"use client";
import React, { useState } from "react";
import { Button } from ".";

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`flex justify-between ${className} gap-4 `}>
      <div className="dropdown">
        <Button
          className={"dropdown-toggle"}
          text="Show Dropdown"
          appearance="light"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="dropdown-content w-full max-w-56 p-4 mx-2">
            The Tailwind CSS Dropdown component offers a sleek, user-friendly
            interface for presenting overlay content.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
