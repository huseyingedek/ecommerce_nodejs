import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    message: {
        status: 429,
        message: "hız sınırı aşıldı :)"
    },
    legacyHeaders: false,

})

export default limiter;