/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('S.H.I.E.L.D. Recruitment System')
    .setDescription(
      'API para gestionar el reclutamiento de candidatos para S.H.I.E.L.D., diseñada para la prueba técnica. Permite registrar candidatos, listar preseleccionados con filtros y paginarlos, y generar reportes en PDF. Construida con NestJS y temática de Avengers.',
    )
    .setVersion('1.0.0')
    .setContact(
      'S.H.I.E.L.D. Recruitment Team',
      'https://shield.avengers.com',
      'recruitment@shield.avengers.com',
    )
    .addTag('Candidates', 'Operaciones relacionadas con la gestión de candidatos')
    .addTag('Reports', 'Generación de reportes en PDF para candidatos preseleccionados')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {});

  SwaggerModule.setup('api', app, document);
}