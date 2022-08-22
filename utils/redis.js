import redis from 'redis';
import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * class for creating redis client.
 */
class RedisClient {
    constructor() {
        this.client = createClient();
        this.getAsync = promisify(this.client.get).bind(this.client);

        this.client.on('error', (error) => {
            console.log(`Redis client not connected to the server: ${error.message}`);
        });

        this.client.on('connect', () => {

        });
    }

    /**
     * function that returns true when connection to redis
     * is success, otherwise false.
     */
    isAlive() {
        return this.client.connect;
    }

    /*
     * takes string key as argument & returns Redis value stored for this key
     */
    async get(key) {
        const value = await this.getAsync(key);
        return value;
    }

    /*
     * takes a string key, a value and a duration in second as arguments
     * to store it in Redis (with an expiration set by the duration argument)
     */
    async set(key, value, duration) {
        this.client.setEx(key, duration, value);
    }

    /*
     * takes a string key as argument and remove the value
     * in Redis for this key
     */
    async del(key) {
        this.client.del(key);
    }
}

const redisClient = new RedisClient();

export default redisClient;