import dotenv from "dotenv";

const env: string = process.env.NODE_ENV ?? "development";

dotenv.config();

export default {
  app: {
    env,
    uploadFolder : "uploaded/",
    parsedFolder : "parsed/",
  },
  aws: {
    bucketName: process.env.BUCKET_NAME,
  }
};
