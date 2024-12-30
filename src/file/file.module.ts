import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [FileController],
})
export class FileModule {}
