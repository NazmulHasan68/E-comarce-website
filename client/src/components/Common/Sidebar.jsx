import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Shirt,
  Flame,
  Snowflake,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const categories = [
    {
      label: "T-Shirt",
      icon: Shirt,
      color: "text-sky-600",
      path: "T-Shirt",
    },
    {
      label: "Shirt",
      icon: Shirt,
      color: "text-green-600",
      path: "Shirt",
    },
    {
      label: "Panjabi",
      icon: Flame,
      color: "text-orange-500",
      path: "Panjabi",
    },
    {
      label: "Hoodie",
      icon: Snowflake,
      color: "text-blue-500",
      path: "Hoodie",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-64 bg-[var(--primary-bg-color)] text-[var(--primary-text-color)]"
      >
        <SheetHeader>
          <SheetTitle className="text-sky-600 text-xl font-bold">
            Shadow shop
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  navigate(`/product/${category.path}`);
                  onClose(false);
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-800 cursor-pointer transition-all shadow-md"
              >
                <Icon className={`w-6 h-6 ${category.color}`} />
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {category.label}
                </span>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
