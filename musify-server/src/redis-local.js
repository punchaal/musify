const redis = require('async-redis');
require('dotenv').config();
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST;
const redisAuth = process.env.REDIS_PASS;

const client = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST,
});

client.auth(redisAuth, function (err, response) {
  if (err) {
    throw err;
  }
});

module.exports = client;
