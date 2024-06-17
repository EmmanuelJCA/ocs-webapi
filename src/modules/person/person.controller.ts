import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonService } from './person.service';
import { PersonDto } from './dtos/person.dto';
import { Auth } from '../../decorators/http.decorators';

@Controller('persons')
@ApiTags('persons')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
  ) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get persons',
    type: PersonDto,
  })
  async getPerson(@Query('identification') identification: string): Promise<PersonDto> {
    const personEntity = await this.personService.findOneBy({ identification });

    if (!personEntity) {
      throw new NotFoundException();
    }

    return personEntity.toDto();
  }
}
