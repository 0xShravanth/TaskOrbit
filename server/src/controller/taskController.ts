import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tasksController = {
  /*creating tasksController */
  createTask: async (req: Request, res: Response): Promise<void> => {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = req.body;
    try {
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,
          tags,
          startDate,
          dueDate,
          points,
          projectId,
          authorUserId,
          assignedUserId,
        },
      });
      res.status(200).json(newTask);
    } catch (error: any) {
      res.status(500).json({
        message: `Error creating task ${error.message}`,
      });
    }
  },

  /*getting tasksController */
  getTasks: async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
      const tasks = await prisma.task.findMany({
        where: {
          projectId: projectId ? Number(projectId) : undefined,
        },
        include: {
          author: true,
          assignee: true,
          comments: true,
          attachments: true,
        },
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error fetching tasks: ${error.message}` });
    }
  },
  /*update TaskStatus */
  updateTaskStatus: async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          status: status,
        },
      });
      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(500).json({
        message: `Error updating task: ${error.message}`,
      });
    }
  },
  /*getting user tasks  */
  getUserTasks: async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
      const tasks = await prisma.task.findMany({
        where: {
          OR: [
            { authorUserId: Number(userId) },
            { assignedUserId: Number(userId) },
          ],
        },
        include: {
          author: true,
          assignee: true,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error fetching user tasks: ${error.message}`,
      });
    }
  },
};
