import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function ensureUserInDB() {
  const user = await currentUser()

  if (!user) throw new Error("No user found")

  return prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
    },
  })
}