import { prisma } from "./prismaInstance.js";

const createUser = async (
  name: string,
  email: string,
): Promise<object | null> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return newUser || null;
  } catch (error) {
    console.error("createUser failed: ", { error });
    throw error;
  }
};

function main() {
  console.log("testing");
  createUser("John", "john@doe.com");
  console.log("done");
}

main();
