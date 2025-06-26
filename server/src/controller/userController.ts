import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userController = {
  /*getting all users */
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving users: ${error.message}`,
      });
    }
  },

  /* get user */
  getUser: async (req: Request, res: Response): Promise<void> => {
    const { cognitoId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          cognitoId: cognitoId,
        },
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving user: ${error.message}`,
      });
    }
  },

  /*register user */
  registerUser: async (req: Request, res: Response): Promise<void> => {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          cognitoId,
          profilePictureUrl,
          teamId,
        },
      });
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error: any) {
      res.status(500).json({
        message: `Error registering user: ${error.message}`,
      });
    }
  },
};
