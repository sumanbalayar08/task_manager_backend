import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTask } from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';
import RequestValidator from '../utils/validators.utils';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/task.dto';

const router = Router();

router.post('/', authenticate, RequestValidator.validate(CreateTaskDTO), createTask);
router.get('/', authenticate, getTasks);
router.get('/:id', authenticate, getTask);
router.patch('/:id', authenticate, RequestValidator.validate(UpdateTaskDTO), updateTask);
router.delete('/:id', authenticate, deleteTask);

export default router;