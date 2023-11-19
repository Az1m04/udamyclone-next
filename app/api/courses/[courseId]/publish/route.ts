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

    const hasPublishedChapter = ownCourse.chapter.some(
      (chapter) => chapter.isPublished
    );

    if (
      !ownCourse.title ||
      !ownCourse.description ||
      !ownCourse.categoryId ||
      !ownCourse.imageUrl ||
      !hasPublishedChapter
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (err) {
    console.log("[COURSES_ID_PUBLISH]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
