import jwt from 'jsonwebtoken';

const generateAccessToken = (userId: any) => {
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRES || '1h';
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn });
    return { token, expiresAt: expiresIn };
};

const generateRefreshToken = (userId: any) => {
    const expiresIn = '7d';
    const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn });
    return token;
};

export { generateAccessToken, generateRefreshToken };