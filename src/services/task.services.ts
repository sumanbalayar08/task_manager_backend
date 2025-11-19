import { Task } from '@prisma/client'
import prisma from '../config/prisma'
import { PaginationParams } from '../utils/pagination.utils'
import { HttpException } from '../utils/http-exception'
import { CreateTaskDTO, TaskListResponse, UpdateTaskDTO } from '../dto/task.dto'

export class TaskService {
  private static instance: TaskService

  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService()
    }
    return TaskService.instance
  }

  async getTasks(params: PaginationParams, userId: string): Promise<TaskListResponse> {

    try {
      const { page, perPage, search, sortId = 'createdAt', desc = false, priority} = params
      const take = perPage
      const skip = (page - 1) * take

      const where: any = { userId }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }

      if (priority) {
        where.priority = priority
      }

      const tasks = await prisma.task.findMany({
        where,
        orderBy: { [sortId]: desc ? 'desc' : 'asc' },
        skip,
        take,
      })

      const total = await prisma.task.count({ where })

      return {
        tasks,
        total,
        page,
        perPage,
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to fetch tasks')
    }
  }

  async getTask(id: string, userId: string): Promise<Task> {
    try {
      const task = await prisma.task.findFirst({
        where: { id, userId }
      })

      if (!task) {
        throw HttpException.notFound('Task not found')
      }

      return task
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to fetch task')
    }
  }

  async createTask(taskData: CreateTaskDTO, userId: string): Promise<Task> {
    try {
      return await prisma.task.create({
        data: {
          title: taskData.title,
          description: taskData.description || '',
          priority: taskData.priority,
          endDate: new Date(taskData.endDate),
          userId,
        },
      })
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to create task')
    }
  }

  async updateTask(taskData: UpdateTaskDTO, userId: string): Promise<Task> {
    try {
      const { id, ...updateData } = taskData

      const existingTask = await this.getTask(id!, userId)

      if (!existingTask) {
        throw HttpException.notFound('Task not found')
      }

      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          ...updateData,
          ...(updateData.endDate && { endDate: new Date(updateData.endDate) })
        },
      })

      return updatedTask
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to update task')
    }
  }

  async deleteTask(id: string, userId: string): Promise<{ message: string }> {
    try {
      const existingTask = await this.getTask(id!, userId)

      if (!existingTask) {
        throw HttpException.notFound('Task not found')
      }

      await prisma.task.delete({
        where: { id }
      })

      return { message: 'Task deleted successfully' }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to delete task')
    }
  }
}