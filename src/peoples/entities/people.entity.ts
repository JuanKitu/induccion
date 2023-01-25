import { ApiProperty } from '@nestjs/swagger';

export class People {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'Identificador unico de persona',
  })
  id?: number;
  @ApiProperty({
    required: true,
    example: 'Juan Manuel',
    description: 'nombre del persona',
  })
  name: string;
  @ApiProperty({
    required: true,
    example: 'Borro',
    description: 'apellido materno',
  })
  motherLastName: string;
  @ApiProperty({
    required: true,
    example: 'Santa Cruz',
    description: 'apellido paterno',
  })
  fatherLastName: string;
  @ApiProperty({
    required: true,
    example: 'juan.manuel.santa@accenture.com',
    description: 'Correo del persona',
  })
  email: string;
  @ApiProperty({
    required: true,
    example: new Date('1995/11/28'),
    description: 'Cumpleaños de la persona',
  })
  firstDate: string;
  @ApiProperty({
    required: true,
    example: 27,
    description: 'edad de la persona',
  })
  age: number;
  @ApiProperty({
    required: true,
    example: true,
    description: 'si esta dado de alta',
  })
  active: boolean;
}
