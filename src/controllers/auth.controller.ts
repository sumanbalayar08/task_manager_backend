import { type Request, type Response } from 'express'
import {
  AuthService,
} from '../services/auth.service'
import {
  successResponse,
} from '../utils/response.utils'
import { LoginDTO, RegisterDTO } from '../dto/auth.dto'

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = AuthService.getInstance()
  }

  async register(req: Request, res: Response) {
    await this.authService.register(req.body as RegisterDTO)

    successResponse(res, {
      message: 'Registration successful'
    })
  }

  async login(req: Request, res: Response) {
    const response = await this.authService.login(req.body as LoginDTO)

    res.cookie('token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })

    console.log(response)

    successResponse(res, {
      message: 'Login successful'
    })
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  }

  async getMe(req: Request, res: Response) {
    const userId = (req as any).userId;
    const user = await this.authService.getUserById(userId);

    successResponse(res, {
      data: {
        user,
      },
    });
  }
}

export const authController = new AuthController()

export const register = authController.register.bind(authController)
export const login = authController.login.bind(authController)
export const logout = authController.logout.bind(authController)
export const getMe = authController.getMe.bind(authController)
