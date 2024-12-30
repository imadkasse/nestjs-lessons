import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('files')
export class FileController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      return res.status(HttpStatus.OK).json({
        message: 'File uploaded successfully!',
        url: result.secure_url, // الرابط الخاص بالملف على Cloudinary
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to upload file',
        error: error.message,
      });
    }
  }
}
