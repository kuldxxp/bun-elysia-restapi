import 'dotenv/config'
import { prisma } from '../src/lib/prisma'

const postsToCreate = [
  { id: 1, title: "First post :)", content: "The first post i made" },
  { id: 2, title: "My second post ever", content: "Only my second post, still working on this" },
  { id: 3, title: "One more for good measure", content: "I don't write a lot but when I do, we end up with this many posts" },
  { id: 4, title: "Final post, thank you", content: "This should be enough posts for testing!" },
]

for (const post of postsToCreate) {
  await prisma.post.upsert({
    where: { id: post.id },
    update: post,
    create: post,
  })
}

await prisma.$disconnect()
console.log("Seed completed.")
