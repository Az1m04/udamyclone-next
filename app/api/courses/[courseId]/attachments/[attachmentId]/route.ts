import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,{params}:{params:{courseId:string,attachmentId:string}}) {
  try {
    const { userId } =  auth();
    const { courseId,attachmentId}=params


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
        where: {
          id: courseId,
          userId: userId,
        },
      });
  
      if (!courseOwner) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  

    const attachment = await db.attachment.delete({
      where: {
        id:attachmentId,
        courseId,
      },
      
    });
    return NextResponse.json(attachment);
  } catch (err) {
    console.log("[ATTACHMENT_DELETE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
