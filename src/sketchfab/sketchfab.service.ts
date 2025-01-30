import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

@Injectable()
export class SketchfabService {
  private readonly VECTARY_API_TOKEN = process.env.VECTARY_API_TOKEN;
  private readonly SKETCHFAB_API_TOKEN = process.env.SKETCHFAB_API_TOKEN;
  private readonly VECTARY_API_URL =
    'https://stablediffusionapi.com/api/v3/img_to_3d'; // Ensure this is correct as per Vectary documentation
  private readonly SKETCHFAB_API_URL = 'https://api.sketchfab.com/v3/models';

  async generateAndUploadModel(
    modelFile: Express.Multer.File,
  ): Promise<string> {
    try {
      // Step 1: Generate 3D model using Vectary API
      const vectaryFormData = new FormData();
      vectaryFormData.append('file', modelFile.buffer, modelFile.originalname); // Ensure correct field name
      vectaryFormData.append('name', modelFile.originalname); // Example of additional fields if required by API

      // Debug: Print form data to verify fields
      console.log('Vectary form data:', vectaryFormData);

      const vectaryResponse = await axios.post(
        this.VECTARY_API_URL,
        vectaryFormData,
        {
          headers: {
            ...vectaryFormData.getHeaders(),
            Authorization: `Bearer ${this.VECTARY_API_TOKEN}`,
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false, // Disable SSL verification for testing purposes
          }),
        },
      );

      // Debug: Check if Vectary response is successful
      console.log('Vectary response:', vectaryResponse.data);

      if (!vectaryResponse.data || !vectaryResponse.data.modelUrl) {
        throw new Error('Failed to generate 3D model using Vectary');
      }

      const generatedModelUrl = vectaryResponse.data.modelUrl;

      // Step 2: Download the generated 3D model to prepare it for uploading to Sketchfab
      const modelFileResponse = await axios.get(generatedModelUrl, {
        responseType: 'stream',
      });
      const modelFilePath = `./uploads/generated-model-${Date.now()}.glb`;
      const writer = fs.createWriteStream(modelFilePath);
      modelFileResponse.data.pipe(writer);

      await new Promise((resolve, reject) => {
        // writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Step 3: Upload the 3D model to Sketchfab
      const formData = new FormData();
      formData.append('modelFile', fs.createReadStream(modelFilePath));
      formData.append('name', modelFile.originalname);
      formData.append(
        'description',
        '3D model generated from image using Vectary and uploaded to Sketchfab',
      );
      formData.append('private', '1'); // Set to '1' to make the model private
      formData.append('tags', 'e-commerce,3D model');

      const sketchfabResponse = await axios.post(
        this.SKETCHFAB_API_URL,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Token ${this.SKETCHFAB_API_TOKEN}`,
          },
        },
      );

      // Debug: Print Sketchfab response
      console.log('Sketchfab response:', sketchfabResponse.data);

      // Clean up the locally saved model file
      fs.unlinkSync(modelFilePath);

      return `https://sketchfab.com/models/${sketchfabResponse.data.uid}`;
    } catch (error) {
      // Debug: Log the error details
      console.error('Error generating or uploading 3D model:', error);

      throw new HttpException(
        'Error generating or uploading 3D model',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
