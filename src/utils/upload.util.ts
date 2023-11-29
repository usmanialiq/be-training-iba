/* eslint-disable camelcase */
import { v2 as client } from 'cloudinary';
import { Config } from '../config';

client.config({
  cloud_name: Config.cloudinary.cloud,
  api_key: Config.cloudinary.api,
  api_secret: Config.cloudinary.secret,
});

export const uploadToCloudinary = async (
  images,
  folder: string,
): Promise<string> => {
  try {
    const { secure_url } = await client.uploader.upload(images, {
      folder,
      resource_type: 'auto',
    });
    return secure_url;
  } catch (error: any) {
    throw error;
  }
};
