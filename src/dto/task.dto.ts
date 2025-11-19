import { Task } from "@prisma/client"
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator'

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export class CreateTaskDTO {
  @IsNotEmpty({ message: 'Title required' })
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty({ message: 'Priority required' })
  @IsEnum(TaskPriority, { message: 'Priority must be LOW, MEDIUM, or HIGH' })
  priority: TaskPriority  

  @IsNotEmpty()
  @IsString()
  endDate: string
}

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsEnum(TaskPriority, { message: 'Priority must be LOW, MEDIUM, or HIGH' })
  priority?: TaskPriority

  @IsNotEmpty()
  @IsString()
  endDate?: string
}

export interface TaskListResponse {
  tasks: Task[]
  total: number
  page: number
  perPage: number
}
