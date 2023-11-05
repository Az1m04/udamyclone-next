const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
        data: [
          { name: "Computer Science" },
          { name: "Fitness" },
          { name: "Mathematics" },
          { name: "Physics" },
          { name: "Biology" },
          { name: "Chemistry" },
        ],
      });
    console.log("success");
  } catch (err) {
    console.log("err.message", err);
  } finally {
    await database.$disconnect();
  }
}

main();
