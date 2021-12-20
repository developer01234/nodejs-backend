import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    throw new Error("Method not implemented.");
  }
}
