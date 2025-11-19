export class HttpException extends Error {
  public statusCode: number
  public message: string

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.name = 'HttpException'
  }

  static badRequest(message: string): HttpException {
    return new HttpException(400, message)
  }

  static unauthorized(message: string = 'Unauthorized'): HttpException {
    return new HttpException(401, message)
  }

  static forbidden(message: string = 'Forbidden'): HttpException {
    return new HttpException(403, message)
  }

  static notFound(message: string = 'Not found'): HttpException {
    return new HttpException(404, message)
  }

  static conflict(message: string): HttpException {
    return new HttpException(409, message)
  }

  static internalServerError(message: string = 'Internal server error'): HttpException {
    return new HttpException(500, message)
  }
}