import UserModel, { IUser } from '../models/user.model';
import RefreshTokenModel from '../models/token.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import jwt from 'jsonwebtoken';

class AuthService {
    public async findUserByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email }).exec();
    }

    public async register(name: string, lastName: string, email: string, password: string, phone: string, address: string): Promise<IUser> {
        const newUser: IUser = { name, lastName, email, password, phone, address } as IUser;
        const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });

        if (existingUser) {
            if (existingUser.email === email) {
                throw new Error('User with this email already exists');
            } else if (existingUser.phone === phone) {
                throw new Error('User with this phone number already exists');
            }
        }

        const user = new UserModel(newUser);
        return await user.save();
    }

    public async validateUser(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; accessTokenExpiresAt: string; user: IUser } | false> {
        const user = await UserModel.findOne({ email });

        if (!user) return false;

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) return false;

        const refreshTokenRecord = await RefreshTokenModel.findOne({ user: user._id });

        if (refreshTokenRecord) {
            await RefreshTokenModel.deleteOne({ _id: refreshTokenRecord._id });
        }

        const refreshToken = generateRefreshToken(user._id);
        const { token: accessToken, expiresAt: accessTokenExpiresAt } = generateAccessToken(user._id);

        const refreshTokenM = new RefreshTokenModel({
            token: refreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await refreshTokenM.save();

        return { accessToken, refreshToken, accessTokenExpiresAt, user };
    }

    public async refreshAccessTokenService(refreshToken: string): Promise<string | null> {
        try {
            const savedToken = await RefreshTokenModel.findOne({ token: refreshToken });
            if (!savedToken) {
                return null;
            }
            if (savedToken.expiresAt < new Date()) {
                await savedToken.deleteOne({ _id: savedToken._id });
                return null;
            }

            return new Promise((resolve, reject) => {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
                    if (err) {
                        reject(null);
                    } else {
                        const { token: newAccessToken } = generateAccessToken(decoded.userId);
                        resolve(newAccessToken);
                    }
                });
            });
        } catch (error) {
            console.error('Error in refresh token service:', error);
            return null;
        }
    }

    public async checkToken(token: string): Promise<IUser | null> {
        try {
            const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
            return await UserModel.findById(decoded.userId).exec();
        } catch (error) {
            console.error('Error in check token service:', error);
            return null;
        }
    }
}

export default new AuthService();