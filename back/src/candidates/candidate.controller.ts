/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ValidationPipe,
  ParseIntPipe,
  StreamableFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CandidateService } from './candidate.service';
import { CandidateDTO, FilterDTO, NewCandidateDTO, PaginationDTO } from './candidates.dto';

@ApiTags('Candidates')
@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de candidatos con filtros y paginación',
    description: 'Recupera una lista paginada de candidatos registrados en S.H.I.E.L.D., con filtros opcionales por nombre, institución, carrera y puntaje mínimo de preselección.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (por defecto: 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de candidatos por página (por defecto: 10)', example: 10 })
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Filtro por nombre completo (parcial)', example: 'Peter' })
  @ApiQuery({ name: 'institucion', required: false, type: String, description: 'Filtro por institución educativa (parcial)', example: 'Xavier' })
  @ApiQuery({ name: 'carrera', required: false, type: String, description: 'Filtro por carrera cursada (parcial)', example: 'Física' })
  @ApiQuery({ name: 'puntaje_min', required: false, type: Number, description: 'Puntaje mínimo de preselección (0-100)', example: 60 })
  @ApiQuery({ name: 'carrera', required: false, type: String, description: 'Carrera a buscar entre los candidatos.', example: 'Física Aplicada' })
  @ApiResponse({
    status: 200,
    description: 'Lista de candidatos paginada',
    type: PaginationDTO,
  })
  @ApiBadRequestResponse({ description: 'Parámetros inválidos (ej. page <= 0, puntaje_min fuera de rango)' })
  @ApiNotFoundResponse({ description: 'No hay candidatos registrados' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('nombre') nombre: string,
    @Query('institucion') institucion: string,
    @Query('carrera') carrera: string,
    @Query('puntaje_min') puntaje_min: number,
  ): Promise<PaginationDTO> {
    if(puntaje_min < 0 || puntaje_min > 100) throw new BadRequestException('El puntaje debe ser mayor a 0 y menor a 100');
    if(page <= 0 || isNaN(page)) page = 1;
    if(limit <= 0 || isNaN(limit)) limit = 10;
    return this.candidateService.getCandidates(page, limit, {nombre, institucion, carrera, puntaje_min});
  }; 

  @Get('report')
  @ApiOperation({
    summary: 'Generar reporte PDF de candidatos preseleccionados',
    description: 'Genera un reporte en formato PDF con los candidatos preseleccionados que cumplen con los filtros especificados (por defecto, puntaje mínimo de 60).',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte PDF generado',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'No hay candidatos preseleccionados' })
  @ApiInternalServerErrorResponse({ description: 'Error al generar el PDF' })
  async generatePDFReport(): Promise<StreamableFile> {
    return this.candidateService.generetePDFReport();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener candidato por ID',
    description: 'Recupera los detalles de un candidato específico en S.H.I.E.L.D. usando su ID único.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del candidato', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Detalles del candidato',
    type: CandidateDTO,
  })
  @ApiBadRequestResponse({ description: 'ID inválido (no es un número o <= 0)' })
  @ApiNotFoundResponse({ description: 'Candidato no encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  async getCandidateById(@Param('id', ParseIntPipe) id: number): Promise<CandidateDTO> {
    return this.candidateService.getCandidateById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar un nuevo candidato',
    description: 'Registra un nuevo candidato en el sistema de S.H.I.E.L.D. y calcula su puntaje de preselección.',
    
  })
  @ApiBody({ type: NewCandidateDTO, description: 'Datos del nuevo candidato' })
  @ApiResponse({
    status: 201,
    description: 'Candidato registrado exitosamente',
    type: CandidateDTO,
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos o correo duplicado' })
  @ApiInternalServerErrorResponse({ description: 'Error al registrar el candidato' })
  async newCandidate(@Body() candidate: NewCandidateDTO): Promise<string> {
    return this.candidateService.newCandidate(candidate);
  }
}