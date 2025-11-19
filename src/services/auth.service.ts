import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import prisma from '../config/prisma'
import { HttpException } from '../utils/http-exception'
import { RegisterDTO, LoginDTO, AuthResponse, RegisterResponse } from '../dto/auth.dto'

export class AuthService {
  private static instance: AuthService

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async register(userData: RegisterDTO): Promise<RegisterResponse> {
    try {
      const { email, password, name } = userData

      const existingUser = await prisma.user.findUnique({ where: { email } })

      if (existingUser) {
        throw HttpException.conflict('Email already in use')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await prisma.user.create({
        data: { name, email, password: hashedPassword },
      })

      return {
        success: true,
        message: 'User registered successfully'
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to register user')
    }
  }

  async login(loginData: LoginDTO): Promise<AuthResponse> {
    try {
      const { email, password } = loginData

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        throw HttpException.unauthorized('Invalid credentials')
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        throw HttpException.unauthorized('Invalid credentials')
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, { expiresIn: '10m' })

      return {
        token,
      }
      
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to login')
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) {
        throw HttpException.notFound('User not found')
      }

      return user
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.internalServerError('Failed to get user')
    }
  }

  verifyToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw HttpException.unauthorized('Invalid token')
    }
  }
}