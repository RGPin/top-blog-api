import { prisma } from "./prismaInstance.js";
import { type User } from "./generated/prisma/client.js";
import { type Post } from "./generated/prisma/client.js";

const createUser = async (
  name: string | null,
  email: string,
): Promise<User | null> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name ?? "AnonymousUser",
        email,
      },
    });
    return newUser || null;
  } catch (error) {
    console.error("createUser failed: ", { error });
    throw error;
  }
};

const createPost = async (
  content: string | null,
  title: string,
  authorId: number,
): Promise<Post | null> => {
  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        title,
        authorId,
      },
    });
    return newPost || null;
  } catch (error) {
    console.error("createPost failed: ", { error });
    throw error;
  }
};

function main() {
  console.log("testing");
  createPost("This is content", "Title", 1);
  console.log("done");
}

main();
