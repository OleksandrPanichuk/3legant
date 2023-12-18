import * as dotenv from 'dotenv'
dotenv.config()

export const REDIS_URL = process.env.REDIS_URL
export const DATABASE_URL = process.env.DATABASE_URL

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export const BACKEND_URL = process.env.URL;


export enum EnvKeys  {
    MAIL_HOST = 'MAIL_HOST',
    MAIL_PORT = 'MAIL_PORT',
    MAIL_USER = 'MAIL_USER',
    MAIL_PASSWORD = 'MAIL_PASSWORD',
    MAIL_FROM = 'MAIL_FROM',
    PORT = 'PORT',
    CLIENT_URL = 'CLIENT_URL',
}
