import { Telegraf } from 'telegraf';
import { token } from './connections/token.connection.js';

export const ADMIN = parseInt(process.env.ADMINS);
export const bot = new Telegraf(token);