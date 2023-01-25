import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PeoplesService } from '../services/peoples.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { People } from '../entities/people.entity';
import { CreatePeopleDto, UpdatePeopleDto } from '../dtos/peoples.dto';

@ApiTags('peoples')
@Controller('peoples')
export class PeoplesController {
  constructor(private readonly peopleService: PeoplesService) {}
  @Get()
  @ApiOperation({
    summary: 'Obtiene todos las personas registrados en memoria',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna una lista de personas',
    type: People,
    isArray: true,
  })
  async findAll(): Promise<People[]> {
    return this.peopleService.findAll();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una persona especifica',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna una persona',
    type: People,
    isArray: false,
  })
  async findOne(@Param('id') id: number): Promise<People> {
    return this.peopleService.findOne(+id);
  }
  @Post()
  @ApiOperation({
    summary: 'crear una nueva persona',
  })
  @ApiBody({
    type: CreatePeopleDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Retorna una persona creada',
    type: People,
    isArray: false,
  })
  async create(@Body() payload: CreatePeopleDto): Promise<People> {
    console.log(payload);
    return this.peopleService.create(payload);
  }
  @Put(':id')
  @ApiOperation({
    summary: 'Modificar una persona',
  })
  @ApiBody({
    type: UpdatePeopleDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Retorna una persona modificada',
    type: People,
    isArray: false,
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdatePeopleDto,
  ): Promise<People> {
    return this.peopleService.update(+id, payload);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una persona',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna true',
  })
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.peopleService.remove(+id);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Elimina una persona de forma logica',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna una persona dada de baja',
  })
  async removeLogic(@Param('id') id: number): Promise<People> {
    return this.peopleService.removeLogic(+id);
  }
}
