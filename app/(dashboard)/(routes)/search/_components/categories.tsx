"use client";

import React from "react";
import { Category } from "@prisma/client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";

import { IconType } from "react-icons";
import CategoryItems from "./categoryItems";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto">
      {items.map((item) => (
        <CategoryItems
          key={item.id}
          label={item.name}
          value={item.id}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
};

export default Categories;
