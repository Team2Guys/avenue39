import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SketchfabService } from './sketchfab.service';
import { Express } from 'express';

@Controller('sketchfab')
export class SketchfabController {
  constructor(private readonly sketchfabService: SketchfabService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageAndGenerateModel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      // Call the service to generate a 3D model using Vectary and then upload it to Sketchfab
      const sketchfabUrl =
        await this.sketchfabService.generateAndUploadModel(file);
      return { sketchfabUrl };
    } catch (error) {
      throw new HttpException(
        'Error generating or uploading 3D model',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
