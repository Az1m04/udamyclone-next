import { db } from "@/lib/db";
import { Category, Chapter, Course, Purchase } from "@prisma/client";
import { getProgress } from "./get-progress";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title!;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });
  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings!).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;
    return {
      data: data,
      totalRevenue: totalRevenue,
      totalSales: totalSales,
    };
  } catch (err) {
    console.log("[GET_ANALYTICS]", err);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
