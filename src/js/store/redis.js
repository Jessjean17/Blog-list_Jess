import redis from 'redis';
import { config } from 'dotenv';

config();
const REDIS_PORT = process.env.REDIS_PORT || 6379;

let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient(REDIS_PORT);
}

export default client;
