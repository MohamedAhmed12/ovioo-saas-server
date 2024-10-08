import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UploadAssetDto } from './dto/upload-asset.dto';

@Injectable()
export class UploadService {
  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    // Path google key file
    const keyFilename = path.join(
      __dirname,
      '..',
      '..',
      'google-cloud-key.json',
    );

    // Check if the key file exists and then initialize the Google Cloud Storage client
    if (fs.existsSync(keyFilename)) {
      const credentials = JSON.parse(fs.readFileSync(keyFilename, 'utf8'));

      this.storage = new Storage({
        projectId: credentials.project_id,
        credentials,
      });
      this.bucket = this.storage.bucket(process.env.GCS_BUCKET);
    } else {
      console.error('Service account key file not found');
      throw new Error('Service account key file not found');
    }
  }

  async uploadFiles(
    files: Express.Multer.File[],
    { path, inDirectory }: UploadAssetDto,
  ): Promise<any[]> {
    const filesPaths = [];

    for (const file of files) {
      const fileName =
        inDirectory.toLowerCase() == 'true'
          ? `${path}/${String(file.originalname)}`
          : path;
      const fileHandle = this.bucket.file(fileName);

      try {
        await fileHandle.save(file.buffer, {
          contentType: file.mimetype,
          metadata: {
            contentDisposition: 'inline',
          },
        });

        const [fileSaved] = await this.bucket.file(fileName).exists();
        console.log(fileSaved);

        if (!fileSaved) {
          throw new Error(`Error uploading file ${file.originalname}`);
        }

        // Construct the file path or URL as needed
        const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${fileName}`;

        filesPaths.push({
          type: file.mimetype,
          alt: fileName,
          gcsPath: publicUrl,
        });
      } catch (error) {
        throw new Error(`Error uploading file ${file.originalname}:`, error);
      }
    }

    return filesPaths;
  }

  async cleanDirectory(path: string) {
    console.log(1111, path);

    const [files] = await this.bucket.getFiles({
      prefix: path + '/',
    });

    await Promise.all(
      files.map(async (file) => {
        await file.delete();
      }),
    );
  }
}
