import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePeopleDto {
  @ApiProperty({
    required: true,
    example: 'Juan Manuel',
    description: 'Nombre de la persona',
  })
  @IsString()
  @Length(1, 100)
  readonly name: string;
  @ApiProperty({
    required: true,
    example: 'Borro',
    description: 'apellido materno',
  })
  @IsString()
  @Length(1, 150)
  readonly motherLastName: string;
  @ApiProperty({
    required: true,
    example: 'Santa Cruz',
    description: 'apellido paterno',
  })
  @IsString()
  @Length(1, 150)
  readonly fatherLastName: string;
  @ApiProperty({
    required: true,
    example: 'juan.manuel.santa@accenture.com',
    description: 'Correo del persona',
  })
  @IsEmail()
  @Length(2, 250)
  readonly email: string;
  @ApiProperty({
    required: true,
    example: new Date('1995/11/28'),
    description: 'Cumpleaños de la persona',
  })
  @IsString()
  readonly firstDate: string;
  @ApiProperty({
    required: true,
    example: 27,
    description: 'edad de la persona',
  })
  @IsNumber()
  readonly age: number;
  @ApiProperty({
    required: true,
    example: true,
    description: 'si esta dado de alta',
  })
  @IsBoolean()
  readonly active: boolean;
}
export class UpdatePeopleDto {
  @ApiProperty({
    required: true,
    example: 'Juan Manuel',
    description: 'Nombre de la persona',
  })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  readonly name?: string;
  @ApiProperty({
    required: true,
    example: 'Borro',
    description: 'apellido materno',
  })
  @IsString()
  @Length(1, 150)
  @IsOptional()
  readonly motherLastName?: string;
  @ApiProperty({
    required: true,
    example: 'Santa Cruz',
    description: 'apellido paterno',
  })
  @IsString()
  @Length(1, 150)
  @IsOptional()
  readonly fatherLastName?: string;
  @ApiProperty({
    required: true,
    example: 'juan.manuel.santa@accenture.com',
    description: 'Correo del persona',
  })
  @IsEmail()
  @Length(2, 250)
  @IsOptional()
  readonly email?: string;
  @ApiProperty({
    required: true,
    example: '1995/11/28',
    description: 'Cumpleaños de la persona',
  })
  @IsOptional()
  readonly firstDate?: string;
  @ApiProperty({
    required: true,
    example: 27,
    description: 'edad de la persona',
  })
  @IsOptional()
  readonly age?: number;
  @ApiProperty({
    required: true,
    example: true,
    description: 'si esta dado de alta',
  })
  @IsOptional()
  readonly active?: boolean;
}
