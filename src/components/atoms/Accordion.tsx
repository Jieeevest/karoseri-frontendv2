/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: any;
  isOpenDefault: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  defaultOpenIndex?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpenDefault,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div
      className={`accordion-item [&:not(:last-child)]:border-b border-b-gray-200 ${
        isOpen ? "active" : ""
      }`}
    >
      <button
        className="accordion-toggle py-4 group w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base text-gray-900 font-semibold">{title}</span>
        <i
          className={`ki-outline ${
            isOpen ? "ki-minus" : "ki-plus"
          } text-gray-600 text-2sm`}
        ></i>
      </button>

      {/* Smooth animation with transition for max-height */}
      <div
        className={`accordion-content overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-[2000px]" : "max-h-0"
        }`}
      >
        <div className="text-gray-700 text-md pb-4">{content}</div>
      </div>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex = null,
}) => {
  return (
    <div data-accordion="true">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item?.title}
          content={item?.content}
          isOpenDefault={defaultOpenIndex === index}
        />
      ))}
    </div>
  );
};

export default Accordion;
