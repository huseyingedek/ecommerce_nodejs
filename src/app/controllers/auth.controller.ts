import { Request, Response } from 'express';
import AuthService from '../services/auth.services';
import { registerSchema, loginSchema } from '../validations/auth.validator';

class AuthController {
    public async register(req: Request, res: Response): Promise<void> {
        const { name, lastName, email, password, phone, address, role } = req.body;

        const { error } = registerSchema.validate({ name, lastName, email, password, phone, address, role });
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        try {
            const newUser = await AuthService.register(name, lastName, email, password, phone, address, role);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json(error instanceof Error ? { message: error.message } : { message: 'Unknown error' });
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
                const { accessToken, refreshToken, accessTokenExpiresAt, user } = isValid;

                res.status(200).json({ message: 'Login successful', accessToken, refreshToken, accessTokenExpiresAt, user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Login failed', error: errorMessage });
        }
    }

    public async adminLogin(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
    
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            res.status(400).json({ message: error.message });
            return;
        }
    
        try {
            const isValid = await AuthService.validateAdmin(email, password);
            if (isValid) {
                const { accessToken, refreshToken, accessTokenExpiresAt, user } = isValid;
    
                res.status(200).json({ message: 'Admin login successful', accessToken, refreshToken, accessTokenExpiresAt, user });
            } else {
                res.status(401).json({ message: 'Invalid admin credentials' });
            }
        } catch (error) {
            console.error('Admin login error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Admin login failed', error: errorMessage });
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

    public async check(req: Request, res: Response): Promise<void> {
        const { token } = req.body;

        if (!token) {
            res.status(400).json({ message: 'Token is required' });
            return;
        }

        try {
            const user = await AuthService.checkToken(token);
            if (!user) {
                res.status(401).json({ message: 'Invalid or expired token' });
                return;
            }
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default new AuthController();