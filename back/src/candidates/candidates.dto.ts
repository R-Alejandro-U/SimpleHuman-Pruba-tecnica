/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CandidateDTO {
  @ApiProperty({
    description: 'ID único del candidato asignado por S.H.I.E.L.D.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Puntaje de preselección del candidato (0-100), calculado según criterios de S.H.I.E.L.D.',
    example: 79.43,
  })
  puntuacion: number;

  @ApiProperty({
    description: 'Nombre completo del candidato',
    example: 'Peter Parker',
  })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  @IsString({ message: 'El nombre completo debe ser un texto.' })
  nombre_completo: string;

  @ApiProperty({
    description: 'Correo electrónico del candidato',
    example: 'peter.parker@avengers.com',
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail(
    {},
    {
      message:
        'El correo electrónico debe tener un formato válido (ej. peter.parker@avengers.com).',
    },
  )
  correo_electronico: string;

  @ApiProperty({
    description: 'Institución educativa del candidato',
    example: 'Academia de Héroes de Xavier',
  })
  @IsNotEmpty({ message: 'La institución educativa es obligatoria.' })
  @IsString({
    message:
      'La institución educativa debe ser un texto (ej. Academia de Héroes de Xavier).',
  })
  institucion_educativa: string;

  @ApiProperty({
    description: 'Carrera cursada por el candidato',
    example: 'Física Aplicada',
  })
  @IsNotEmpty({ message: 'La carrera cursada es obligatoria.' })
  @IsString({
    message: 'La carrera cursada debe ser un texto (ej. Física Aplicada).',
  })
  carrera_cursada: string;

  @ApiProperty({
    description: 'Promedio académico del candidato (rango 3-10)',
    example: 8.5,
  })
  @IsNotEmpty({ message: 'El promedio académico es obligatorio.' })
  @IsNumber(
    {},
    { message: 'El promedio académico debe ser un número (ej. 8.5).' },
  )
  @Min(3, { message: 'El promedio académico debe ser al menos 3.' })
  @Max(10, { message: 'El promedio académico no puede exceder 10.' })
  promedio_academico: number;

  @ApiPropertyOptional({
    description: 'Lista de habilidades del candidato',
    type: [String],
    example: ['agilidad sobrehumana', 'tecnología', 'sentido arácnido'],
  })
  @IsOptional()
  @IsArray({
    message:
      'Las habilidades deben ser una lista de textos (ej. ["agilidad sobrehumana", "tecnología"]).',
  })
  habilidades?: string[];

  @ApiPropertyOptional({
    description: 'Experiencia laboral del candidato',
    example: 'Vigilante nocturno',
  })
  @IsOptional()
  @IsString({
    message:
      'La experiencia laboral debe ser un texto (ej. Vigilante nocturno).',
  })
  experiencia_laboral?: string;
}

export class NewCandidateDTO {
  @ApiProperty({
    description: 'Nombre completo del candidato',
    example: 'Peter Parker',
  })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  @IsString({ message: 'El nombre completo debe ser un texto.' })
  nombre_completo: string;

  @ApiProperty({
    description: 'Correo electrónico del candidato',
    example: 'peter.parker@avengers.com',
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail(
    {},
    {
      message:
        'El correo electrónico debe tener un formato válido (ej. peter.parker@avengers.com).',
    },
  )
  correo_electronico: string;

  @ApiProperty({
    description: 'Institución educativa del candidato',
    example: 'Academia de Héroes de Xavier',
  })
  @IsNotEmpty({ message: 'La institución educativa es obligatoria.' })
  @IsString({
    message:
      'La institución educativa debe ser un texto (ej. Academia de Héroes de Xavier).',
  })
  institucion_educativa: string;

  @ApiProperty({
    description: 'Carrera cursada por el candidato',
    example: 'Física Aplicada',
  })
  @IsNotEmpty({ message: 'La carrera cursada es obligatoria.' })
  @IsString({
    message: 'La carrera cursada debe ser un texto (ej. Física Aplicada).',
  })
  carrera_cursada: string;

  @ApiProperty({
    description: 'Promedio académico del candidato (rango 3-10)',
    example: 8.5,
  })
  @IsNotEmpty({ message: 'El promedio académico es obligatorio.' })
  @IsNumber(
    {},
    { message: 'El promedio académico debe ser un número (ej. 8.5).' },
  )
  @Min(3, { message: 'El promedio académico debe ser al menos 3.' })
  @Max(10, { message: 'El promedio académico no puede exceder 10.' })
  promedio_academico: number;

  @ApiPropertyOptional({
    description: 'Lista de habilidades del candidato',
    type: [String],
    example: ['agilidad sobrehumana', 'tecnología', 'sentido arácnido'],
  })
  @IsOptional()
  @IsArray({
    message:
      'Las habilidades deben ser una lista de textos (ej. ["agilidad sobrehumana", "tecnología"]).',
  })
  habilidades?: string[];

  @ApiPropertyOptional({
    description: 'Experiencia laboral del candidato',
    example: 'Vigilante nocturno',
  })
  @IsOptional()
  @IsString({
    message:
      'La experiencia laboral debe ser un texto (ej. Vigilante nocturno).',
  })
  experiencia_laboral?: string;
}

export class PaginationDTO {
  @ApiProperty({
    description: 'Número total de páginas disponibles',
    example: 1,
  })
  max_pages: number;

  @ApiProperty({
    description: 'Página actual',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Lista de candidatos en la página actual',
    type: [CandidateDTO],
  })
  candidates: CandidateDTO[];
}

export class FilterDTO {
  @ApiPropertyOptional({
    description: 'Filtro por nombre completo (coincidencia parcial)',
    example: 'Peter',
  })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Filtro por institución educativa (coincidencia parcial)',
    example: 'Xavier',
  })
  institucion?: string;

  @ApiPropertyOptional({
    description: 'Filtro por carrera cursada (coincidencia parcial)',
    example: 'Física',
  })
  carrera?: string;

  @ApiPropertyOptional({
    description: 'Puntaje mínimo de preselección (0-100)',
    example: 60,
  })
  puntaje_min?: number;
}