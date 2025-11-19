import { Response } from 'express'

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  pagination?: {
    total: number
    page: number
    perPage: number
  }
}

export const successResponse = <T>(res: Response, { data, message = 'Success' }: { data?: T; message?: string }) => {
  res.status(200).json({
    success: true,
    message,
    data,
  } as ApiResponse<T>)
}

export const createResponse = (res: Response, { message = 'Created successfully' }: { message?: string }) => {
  res.status(201).json({
    success: true,
    message,
  } as ApiResponse)
}

export const updateResponse = (res: Response, { message = 'Updated successfully' }: { message?: string }) => {
  res.status(200).json({
    success: true,
    message,
  } as ApiResponse)
}

export const deleteResponse = (res: Response, { message = 'Deleted successfully' }: { message?: string }) => {
  res.status(200).json({
    success: true,
    message,
  } as ApiResponse)
}

export const getPaginatedResponse = <T>(res: Response, { data, pagination, message = 'Success' }: { data: T; pagination: { total: number; page: number; perPage: number }; message?: string }) => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  } as ApiResponse<T>)
}