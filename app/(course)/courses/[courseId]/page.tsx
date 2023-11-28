import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const CoursePageId = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapter: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if(!course){
    return redirect("/")
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapter[0].id}`)
};

export default CoursePageId;
