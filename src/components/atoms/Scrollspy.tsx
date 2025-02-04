"use client";
import React, { useState } from "react";

interface ScrollspyProps {
  className?: string;
}

const Scrollspy: React.FC<ScrollspyProps> = ({ className = "" }) => {
  const items = [
    {
      id: "item_1",
      label: "Item 1",
      content:
        "Experience the ethereal beauty of twilight in the mountains, where the last rays of the sun meet the gentle night. As the sky transitions through a palette of warm oranges, pinks, and purples, the mountain silhouettes create a striking contrast, crafting a moment of peace that stands still in time. This captivating scene encapsulates the majestic solitude of nature, inviting viewers to pause and reflect on the day's end. Perfect for lovers of nature and photography, this image embodies the serene splendor of the great outdoors. As nightfall approaches, the first stars begin to twinkle in the twilight, heralding the arrival of a celestial showcase. The mountain's silhouette against the twilight sky becomes a majestic backdrop for stargazers and dreamers alike, offering.",
    },
    { id: "item_2", label: "Item 2", content: "Content for Item 2." },
    { id: "item_3", label: "Item 3", content: "Content for Item 3." },
    { id: "item_4", label: "Item 4", content: "Content for Item 4." },
  ];

  const [activeItem, setActiveItem] = useState(items[0].id);

  return (
    <div className={`${className} flex gap-8 w-full rounded-xl border p-6`}>
      <nav
        className="flex flex-col grow relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:border-l before:border-gray-200 gap-1 shrink-0 w-[125px] "
        aria-label="Scrollspy Navigation"
      >
        {items.map(({ id, label }) => (
          <a
            key={id}
            className={`flex items-center rounded-lg pl-2.5 pr-2.5 py-2.5 gap-1.5 border border-transparent text-2sm font-medium ${
              activeItem === id ? "text-blue-600 bg-slate-100" : "text-gray-700"
            } hover:text-primary`}
            onClick={() => setActiveItem(id)}
            href={`#${id}`}
            aria-label={label}
          >
            <span className="flex w-1.5 relative before:absolute before:top-0 before:left-px before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4">
              {activeItem === id && (
                <span className="bg-blue-600 w-1.5 h-1.5 rounded-full"></span>
              )}
            </span>
            {label}
          </a>
        ))}
      </nav>
      <div className="w-[700px] overflow-y-auto h-[300px] pr-2">
        {items.map(({ id, label, content }) => (
          <div
            key={id}
            id={id}
            className={`px-4 pb-4 ${activeItem === id ? "block" : "hidden"}`}
          >
            <h2 className="text-xl font-bold mb-2">{label}</h2>
            <p className="text-justify">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scrollspy;
