
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
  ) {
    try {
      const { userId } = auth();
      const { courseId, chapterId } = params;
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const ownCourse = await db.course.findUnique({
        where: {
          id: courseId,
          userId,
        },
      });
  
      if (!ownCourse) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      const unpublishedChapter = await db.chapter.update({
        where: {
          id: chapterId,
          courseId: courseId,
        },
        data: {
          isPublished:false
        },
      });
   

      const publishedChaptersInCourse = await db.chapter.findMany({
        where: {
          courseId: chapterId,
          isPublished: true,
        },
      });
  
      if (!publishedChaptersInCourse.length) {
        await db.course.update({
          where: {
            id: courseId,
          },
          data: {
            isPublished: false,
          },
        });
      }
    
  
      return NextResponse.json(unpublishedChapter);
    } catch (err) {
      console.log("[COURSES_CHAPTER_ID_UNPUBLISHED]", err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }