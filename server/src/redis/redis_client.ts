const redis = require('redis');

const r_client = redis.createClient(
  {
    url: process.env.redisURL || 'redis://default:d56aAPjnQsseWJRshmYTjA874rBKzuJq@redis-14545.c85.us-east-1-2.ec2.redns.redis-cloud.com:14545'
  }
);

r_client.on('error', (err:any) => console.error('Redis Error:', err));

r_client.connect().then(() => {
  console.log('Connected to Redis');
});

export default r_client;