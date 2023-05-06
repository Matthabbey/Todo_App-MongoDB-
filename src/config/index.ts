import redis from 'redis'

let redisClient

const RedisClientDB = async () => {
    redisClient = redis.createClient();
  
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
  
    await redisClient.connect();
  }
  
  export default RedisClientDB();