import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('persons')
@ApiTags('persons')
export class PersonController {
  constructor() {}
}
