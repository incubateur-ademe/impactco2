import { HeadObjectCommand, PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'

const s3 = new S3Client({
  region: 'fr-par',
  endpoint: 'https://s3.fr-par.scw.cloud',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
})

export const checkFileExistsOnS3 = async (name: string): Promise<boolean> => {
  if (process.env.LOCAL_STORAGE === 'true') {
    const dir = path.resolve(process.cwd(), 'public', 'imported')
    const filePath = path.join(dir, name)
    return fs.existsSync(filePath)
  }

  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: name,
      })
    )
    return true
  } catch (error: unknown) {
    const err = error as { name?: string; $metadata?: { httpStatusCode?: number } }
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      return false
    }
    throw error
  }
}

export const uploadFileToS3 = async (name: string, file: PutObjectCommandInput['Body']) => {
  if (process.env.LOCAL_STORAGE === 'true') {
    const dir = path.resolve(process.cwd(), 'public', 'imported')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const filePath = path.join(dir, name)
    if (Buffer.isBuffer(file)) {
      fs.writeFileSync(filePath, file)
    } else if (typeof file === 'string') {
      fs.writeFileSync(filePath, Buffer.from(file))
    } else if (file instanceof Readable) {
      const writeStream = fs.createWriteStream(filePath)
      await new Promise<void>((resolve, reject) => {
        file.pipe(writeStream)
        writeStream.on('finish', resolve)
        writeStream.on('error', reject)
      })
    } else {
      throw new Error('Unsupported file type for local storage')
    }
    return
  }
  return s3.send(
    new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: name,
      Body: file,
      ContentType: 'image/png',
      ACL: 'public-read',
    })
  )
}
