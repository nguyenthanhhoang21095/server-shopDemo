import redis from "redis";

const clientRedis = redis.createClient();

export const saveStorage = (key: string, value: any) => {
  clientRedis.set(key, JSON.stringify(value), redis.print);
};

// export const getStorage = async (key: string) => {
//   return await new Promise((resolve, reject) => {
//     clientRedis.get(key, (err, data: any) => {
//       if (err) {
//         resolve(null);
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
// };

export const getStorage = (key: string) => {
  return new Promise((resolve, reject) => {
    clientRedis.get(key, (err, reply:any) => {
      if (err) {
        resolve(null);
      } else {
        resolve(JSON.parse(reply));
      }
    });
  });
};
