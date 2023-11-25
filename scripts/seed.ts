const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
        data: [
          { name: "Computer Science" },
          { name: "Fitness" },
          { name: "Accounting" },
          { name: "Filming" },
          { name: "Engineering" },
          { name: "Photography" },
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
