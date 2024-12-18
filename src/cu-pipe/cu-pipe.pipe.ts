import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CuPipePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log(`this is log :${value}`);
    return value.toUpperCase();
  }
}
