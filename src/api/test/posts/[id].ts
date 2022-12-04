import { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  let prisma: PrismaClient;
  switch (req.method) {
    case "GET":
      prisma = new PrismaClient();

      if (req.params.id) {
        const postAll = await prisma.post.findFirst({
          where: {
            id: +req.params.id
          }
        });
        res.status(200).json(postAll);
      } else {
        res.status(400).json({ error: 'id参数错误' })
      }


      await prisma.$disconnect()
      break;
    case "DELETE":
      prisma = new PrismaClient();

      if (req.params.id) {
        const newDel = await prisma.post.delete({
          where: {
            id: +req.params.id
          }
        });
        res.status(200).json(newDel);
      } else {
        res.status(400).json({ error: 'id参数错误' })
      }

      await prisma.$disconnect()
      break;
    case "PUT":
      prisma = new PrismaClient();

      if (req.params.id) {
        const newPost = await prisma.post.update({
          where: {
            id: +req.params.id
          },
          data: {
            content: req.body.content
          }
        });
        res.status(200).json(newPost);
      } else {
        res.status(400).json({ error: 'id参数错误' })
      }

      await prisma.$disconnect()
      break;
    default:
      res.status(405).json({ message: '方法还未写' })
  }

}