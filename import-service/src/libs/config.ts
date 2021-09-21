import dotenv from "dotenv";

const env: string = process.env.NODE_ENV ?? "development";

dotenv.config();

export default {
  app: {
    env,
  },
  aws: {
    bucketName: process.env.BUCKET_NAME,
  }
};
