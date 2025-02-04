import React, { useState } from "react";
import { Button } from ".";

interface TooltipProps {
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        text="Show Tooltip"
        appearance="primary"
        aria-expanded={isHovered}
        aria-controls="tooltip"
      />
      {isHovered && (
        <div
          id="tooltip"
          role="tooltip"
          className="absolute bottom-full my-1 bg-gray-800 text-white text-xs rounded-lg shadow-lg p-2 z-50"
        >
          Hey, a delightful tooltip is here!
        </div>
      )}
    </div>
  );
};

export default Tooltip;
