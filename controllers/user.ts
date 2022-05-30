import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    get: async (req: Request, res: Response) => {
        const users = await prisma.users.findMany()
        console.log(users);
        res.status(200).json("Sunccess")
    }
}