import { Priority } from "@prisma/client"

export const validatePagination = (page?: string, perPage?: string): [number, number] => {
  const parsedPage = page ? parseInt(page, 10) : 1
  const parsedPerPage = perPage ? parseInt(perPage, 10) : 10

  if (isNaN(parsedPage) || parsedPage < 1) {
    throw new Error('Page must be a positive integer')
  }

  if (isNaN(parsedPerPage) || parsedPerPage < 1 || parsedPerPage > 100) {
    throw new Error('PerPage must be between 1 and 100')
  }

  return [parsedPage, parsedPerPage]
}

export interface PaginationParams {
  page: number
  perPage: number
  search?: string
  sortId?: string
  desc?: boolean
  priority?: Priority
}

export const buildPaginationParams = (query: any): PaginationParams => {
  const [page, perPage] = validatePagination(query.page as string, query.perPage as string)

  return {
    page,
    perPage,
    search: query.search as string,
    sortId: query.sortId as string,
    desc: query.desc === 'true',
    priority: query.priority as Priority,
  }
}