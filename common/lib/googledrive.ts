import {google} from "googleapis";
import {createReadStream} from "fs";

const auth = new google.auth.GoogleAuth({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export const uploadFile = async (filePath: string, fileName: string) => {
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: ['1p6-5o1Afsd6p8P6n_GsEEn1xe12Sqcht'],
    },
    media: {
      mimeType: 'image/jpeg',
      body: createReadStream(filePath),
    },
  });

  return response.data;
};

export const deleteFile = async (fileId: string) => {
  await drive.files.delete({ fileId });
}

