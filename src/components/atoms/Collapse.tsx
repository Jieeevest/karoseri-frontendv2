"use client";
import React, { useState } from "react";
import { Button } from ".";

interface CollapseProps {
  className?: string;
}

const Collapse: React.FC<CollapseProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${className}`}>
      <Button
        text="Toggle Content"
        appearance="primary"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="mt-5 card transition-all delay-300 ease-in-out transform">
          <div className="card-header">
            <h3 className="card-title">Collapsible</h3>
          </div>
          <div className="card-body">
            Centralize your team information with our management tools. Access
            detailed instructions, expert advice, and technical documentation to
            maintain an up-to-date team directory.
          </div>
        </div>
      )}
    </div>
  );
};

export default Collapse;
