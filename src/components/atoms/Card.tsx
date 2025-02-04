import React from "react";

interface CardProps {
  contentHeader?: React.ReactNode;
  styleHeader?: string;
  contentFooter?: React.ReactNode;
  styleFooter?: string;
  children?: React.ReactNode;
  isScrollable?: boolean;
  height?: string;
}

const Card: React.FC<CardProps> = ({
  contentHeader,
  styleHeader,
  contentFooter,
  styleFooter,
  children,
  isScrollable = false,
  height = "200px",
}) => {
  return (
    <div className="card shadow-sm border-[1px] border-gray-300">
      {contentHeader && (
        <div
          className={`card-header ${styleHeader} border-b-[1px] border-gray-300`}
        >
          {" "}
          {contentHeader}
        </div>
      )}
      <div
        className={`card-body ${
          isScrollable ? `scrollable h-[${height}]` : ""
        } py-0 my-4 pr-4 mr-2`}
      >
        {children}
      </div>
      {contentFooter && (
        <div
          className={`card-footer ${styleFooter} border-t-[1px] border-gray-300`}
        >
          {contentFooter}
        </div>
      )}
    </div>
  );
};

export default Card;
