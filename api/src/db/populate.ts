import { createPost, publishPost, createUser } from "./queries";

await createUser("test@user.com", "Test User");

const posts = [
  {
    title: "The Lost Forest",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Morning Coffee Thoughts",
    content: "A quiet morning can often lead to the best ideas.",
  },
  {
    title: "A Walk Through Time",
    content: "History has a way of repeating itself in unexpected ways.",
  },
  {
    title: "Hidden Treasures",
    content: "Sometimes the greatest discoveries are right in front of us.",
  },
  {
    title: "Midnight Adventures",
    content: "The stars seemed brighter than ever that night.",
  },
  {
    title: "The Last Sunrise",
    content: "Every ending is the beginning of something new.",
  },
  {
    title: "Beyond the Horizon",
    content: "There is always another path waiting to be explored.",
  },
  {
    title: "Simple Pleasures",
    content: "Happiness is often found in the smallest moments.",
  },
  {
    title: "The Curious Mind",
    content: "Questions are more valuable than easy answers.",
  },
  {
    title: "Echoes of Yesterday",
    content: "Memories linger long after the moment has passed.",
  },
];

const authorId = 1;

for (const { title, content } of posts) {
  const post = await createPost(title, authorId, content);
  await publishPost(post.id);
}
