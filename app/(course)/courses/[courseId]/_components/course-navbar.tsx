import NavbarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseMobileSidebar from "./course-mobile-sidebar";
interface CourseNavbarProps {
  course: Course & {
    chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b w-full h-full items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
