import * as dotenv from 'dotenv';
dotenv.config();

export const Config = {
  mongoURI: process.env.MONGO_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
  mail: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    from: process.env.EMAIL_FROM_NAME,
    fromAddress: process.env.EMAIL_FROM_ADDRESS,
    devEmail: process.env.DEV_EMAIL,
  },
  apiUrl: 'http://localhost:3000/mail',
  cloudinary: {
    cloud: process.env.CLOUDINARY_CLOUD,
    api: process.env.CLOUDINARY_API,
    secret: process.env.CLOUDINARY_SECRET,
  },
  aws: {
    ses: {
      region: process.env.SES_REGION,
      accessKey: process.env.SES_ACCESS_KEY,
      secretKey: process.env.SES_SECRET_KEY,
    },
  },
};
