import jwt from 'jsonwebtoken';

const generateAccessToken = (userId: any) => {
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRES;
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn,
    });
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + parseInt(expiresIn as string));
    return { token, expiresAt };
};

const generateRefreshToken = (userId: any) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
};

export { generateAccessToken, generateRefreshToken };