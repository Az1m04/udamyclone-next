import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapter: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!ownCourse) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const unPublishedCourse = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unPublishedCourse);
  } catch (err) {
    console.log("[COURSES_ID_UNPUBLISH]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
