import { Request, Response } from 'express';
import UserService from '../services/users.services';

class UserController {
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await UserService.getUserByIdService(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await UserService.updateUserService(userId, req.body);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json(user);
            }
        } catch (error) {
            if (error instanceof Error && error.message.includes('Email or phone already in use')) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Server error', error });
            }
        }
    }
}

export default new UserController();