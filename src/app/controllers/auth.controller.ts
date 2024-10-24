import { Request, Response } from 'express';
import AuthService from '../services/auth.services';
import { registerSchema, loginSchema } from '../validations/auth.validator';

class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        const { name, lastName, email, password, phone, address } = req.body;

        const { error } = registerSchema.validate({ name, lastName, email, password, phone, address });
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        try {
            const newUser = await AuthService.register(name, lastName, email, password, phone, address);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json( error instanceof Error ? { message: error.message } : { message: 'Unknown error' });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const { error } = loginSchema.validate({ email, password });
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        try {
            const isValid = await AuthService.validateUser(email, password);
            if (isValid) {
                const { accessToken, refreshToken, accessTokenExpiresAt } = isValid;

                res.status(200).json({ message: 'Login successful', accessToken, refreshToken, accessTokenExpiresAt });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Login failed', error: errorMessage });
        }
    }

    public async refreshAccessToken(req: Request, res: Response): Promise<void> {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            res.status(400).json({ message: 'Refresh token is required' });
            return;
        }

        try {
            const newAccessToken = await AuthService.refreshAccessTokenService(refreshToken);

            if (!newAccessToken) {
                res.status(403).json({ message: 'Invalid or expired refresh token' });
                return;
            }

            res.status(201).json({ accessToken: newAccessToken });

        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default new UserController();