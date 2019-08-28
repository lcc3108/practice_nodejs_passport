import redis from "redis";
import redisMock from "ioredis-mock"
import { promisify } from "util";

// Bluebird.promisifyAll(redis)

const client = process.env.NODE_ENV === 'production' ? redis.createClient({
  port: 15258, // replace with your port
  host: "redis-15258.c135.eu-central-1-1.ec2.cloud.redislabs.com", // replace with your hostanme or IP address
  password: process.env.RedisPassword, // replace with your password
  // optional, if using SSL
  // use `fs.readFile[Sync]` or another method to bring these values in
  // TODO: SSL 추가
  //   tls: {
  //     key: stringValueOfKeyFile,
  //     cert: stringValueOfCertFile,
  //     ca: [stringValueOfCaCertFile],
  //   },
}) : new redisMock({});

client.on("error", function(err) {
  console.log("Error " + err);
});

export const getKey: (key: string) => Promise<string | undefined> = promisify(client.get).bind(client);
export const setKey: redis.Commands<boolean>["set"] = client.set;
