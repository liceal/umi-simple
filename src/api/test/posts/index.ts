import { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  let prisma: PrismaClient;
  switch (req.method) {
    case "GET":
      prisma = new PrismaClient();

      const postAll = await prisma.post.findMany()

      res.status(200).json(postAll);

      await prisma.$disconnect()
      break;
    case "POST":
      prisma = new PrismaClient();

      const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          createdAt: new Date(),
          tags: req.body.tags.join(','),
        }
      })
      res.status(200).json(newPost)
      await prisma.$disconnect()
      break;
    default:
      res.status(405).json({ message: '方法还未写' })
  }

}