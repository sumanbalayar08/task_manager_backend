import { Task } from '@prisma/client'
import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import {
  TaskService,
} from '../services/task.services'
import { buildPaginationParams } from '../utils/pagination.utils'
import {
  createResponse,
  deleteResponse,
  getPaginatedResponse,
  successResponse,
  updateResponse,
} from '../utils/response.utils'
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/task.dto'

export class TaskController {
  private taskService: TaskService

  constructor() {
    this.taskService = TaskService.getInstance()
  }

  async getAll(req: AuthRequest, res: Response) {
    const params = buildPaginationParams(req.query)
    const userId = req.userId as string

    const response = await this.taskService.getTasks(params, userId)

    getPaginatedResponse<Task[]>(res, {
      data: response.tasks,
      pagination: {
        total: response.total,
        page: response.page,
        perPage: response.perPage,
      },
    })
  }

  async getTask(req: AuthRequest, res: Response) {
    const id = req.params.id
    const userId = req.userId as string

    const data = await this.taskService.getTask(id, userId)
    
    successResponse<Task>(res, {
      data,
    })
  }

  async create(req: AuthRequest, res: Response) {
    const userId = req.userId as string
    await this.taskService.createTask(
      req.body as CreateTaskDTO,
      userId
    )
    createResponse(res, {
      message: 'Task created successfully',
    })
  }

  async update(req: AuthRequest, res: Response) {
    const userId = req.userId as string

    const updateData = {
      id: req.params.id,
      ...req.body
    } as UpdateTaskDTO

    await this.taskService.updateTask(updateData, userId)
    updateResponse(res, {
      message: 'Task updated successfully',
    })
  }

  async delete(req: AuthRequest, res: Response) {
    const id = req.params.id
    const userId = req.userId as string

    const result = await this.taskService.deleteTask(id, userId)
    deleteResponse(res, { message: result.message })
  }
}

export const taskController = new TaskController()

export const createTask = taskController.create.bind(taskController)
export const getTasks = taskController.getAll.bind(taskController)
export const getTask = taskController.getTask.bind(taskController)
export const updateTask = taskController.update.bind(taskController)
export const deleteTask = taskController.delete.bind(taskController)