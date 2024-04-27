import { NotFoundException } from '@nestjs/common';

export class OncologyCenterNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.oncologyCenterNotFound', error);
  }
}
