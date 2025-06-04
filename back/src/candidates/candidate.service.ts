/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs-extra';
import { CandidateDTO, FilterDTO, NewCandidateDTO, PaginationDTO } from './candidates.dto';
import { schools_defauld } from 'Data/schools';
import { RELEVANT_SKILLS } from 'Data/skills';
import { Readable } from 'stream';


@Injectable()
export class CandidateService {
  private readonly path: string = 'Data/Candidates.json';
  async getCandidateById(id: number): Promise<CandidateDTO> {
    try {
      const candidates: CandidateDTO[] = await fs
        .readJson(this.path)
        .catch(() => []);
      const candidate: CandidateDTO | undefined = candidates.find(
        (cand: CandidateDTO) => cand.id === id,
      );
      if (!candidate)
        throw new NotFoundException(
          `No se encontró un candidato con el ID ${id}.`,
        );
      return candidate;
    } catch (error) {
      throw new InternalServerErrorException(
        undefined,
        `Ocurrió un error inesperado. Error: ${error.message || error}.`,
      );
    }
  }

  async newCandidate(candidate: NewCandidateDTO): Promise<string> {
    try {
      const candidates: CandidateDTO[] = await fs
        .readJson(this.path)
        .catch(() => []);
      if (candidates.find((c) => c.correo_electronico === candidate.correo_electronico)) {
        throw new ConflictException('El candidato con este correo ya está registrado en S.H.I.E.L.D.');
      }
      const id: number = candidates.length ? Math.max(...candidates.map(c => c.id)) + 1 : 1;
      candidates.push({
        ...candidate,
        id,
        puntuacion: this.calculateScore(candidate),
      });
      await fs.outputJson(this.path, candidates, { spaces: 2 });
      return `El héroe ha sido registrado en S.H.I.E.L.D. ID del agente: ${id}`;
    } catch (error) {
      if(error instanceof ConflictException) throw error;
      throw new InternalServerErrorException(
        `No se pudo registrar el candidato en el sistema de S.H.I.E.L.D. Error: ${error.message || error}.`,
      );
    };
  }

  paginationCandidates(
    candidates: CandidateDTO[],
    limit: number,
    page: number,
  ) {
    const total_items: number = candidates.length;
    const max_pages: number = Math.ceil(total_items / limit);
    const current_page: number = Math.min(Math.max(1, page), max_pages);
    const init: number = (current_page - 1) * limit;
    const end: number = Math.min(current_page * limit, total_items);
    const partialCandidates: CandidateDTO[] = candidates.slice(init, end);
    return {
      max_pages,
      page: current_page,
      candidates: partialCandidates,
    };
  }

  filterCandidates(
    candidates: CandidateDTO[],
    filter: FilterDTO,
  ): CandidateDTO[] {
    if (filter.nombre) {
      candidates = candidates.filter((c) =>
        c.nombre_completo.toLowerCase().includes(filter.nombre!.toLowerCase()),
      );
    }
    if (filter.institucion) {
      candidates = candidates.filter((c) =>
        c.institucion_educativa
          .toLowerCase()
          .includes(filter.institucion!.toLowerCase()),
      );
    }
    if (filter.carrera) {
      candidates = candidates.filter((c) =>
        c.carrera_cursada.toLowerCase().includes(filter.carrera!.toLowerCase()),
      );
    }
    if (filter.puntaje_min) {
      candidates = candidates.filter(
        (c) => (c.puntuacion || 0) >= (filter.puntaje_min ?? 0),
      );
    }
    return candidates;
  }

  async getCandidates(
    page: number,
    limit: number,
    filter: FilterDTO,
  ): Promise<PaginationDTO> {
    try {
      let candidates: CandidateDTO[] = await fs.readJson(this.path).catch(() => []);
      if (!candidates.length)
        throw new NotFoundException('No hay ningún candidato a agente.');
      candidates = this.filterCandidates(candidates, filter);
      return this.paginationCandidates(candidates, limit, page);
    } catch (error) {
      throw error;
    };
  }

  calculateScore (candidate: NewCandidateDTO): number {
    if (
      candidate.promedio_academico <= 7.5 ||
      !schools_defauld.includes(candidate.institucion_educativa) ||
      !candidate.habilidades?.some((skill) => RELEVANT_SKILLS.includes(skill))
    ) return 0;
    const academicScore = (candidate.promedio_academico - 3) / (10 - 3);
    const schoolAvarage: number = schools_defauld.includes(candidate.institucion_educativa) ? 1 : 0;
    const skillsAvarage: number = candidate.habilidades ? candidate.habilidades.filter((skill: string) => RELEVANT_SKILLS.includes(skill)).length / 5 : 0;
    return (0.4 * academicScore + 0.3 * schoolAvarage + 0.3 * skillsAvarage) * 100;
  }

  async generetePDFReport(): Promise<StreamableFile> {
    try {
      let candidates: CandidateDTO[] = await fs.readJson(this.path).catch(() => []);
      if (!candidates.length) throw new NotFoundException('No hay ningún ningún agente registrado.');
      candidates = candidates.filter((c: CandidateDTO) => c.puntuacion >= 60);
      if (!candidates.length) throw new NotFoundException('No hay agentes que cumplan los requisitos de preelección.');
      const doc: PDFKit.PDFDocument = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];
      const pdfPromise = new Promise<Buffer>((resolve, reject) => {
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);
      });
      doc.fontSize(20).text('S.H.I.E.L.D. Preselected Candidates Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Selection Threshold: 60 points`, { align: 'center' });
      doc.moveDown(2);
      candidates.forEach((candidate, index) => {
        doc.fontSize(14).text(`Candidate #${index + 1}`, { underline: true });
        doc.fontSize(12);
        doc.text(`ID: ${candidate.id}`);
        doc.text(`Name: ${candidate.nombre_completo}`);
        doc.text(`Email: ${candidate.correo_electronico}`);
        doc.text(`Institution: ${candidate.institucion_educativa}`);
        doc.text(`Major: ${candidate.carrera_cursada}`);
        doc.text(`Academic Average: ${candidate.promedio_academico}`);
        doc.text(`Skills: ${candidate.habilidades?.join(', ') || 'None'}`);
        doc.text(`Experience: ${candidate.experiencia_laboral || 'None'}`);
        doc.text(`Preselection Score: ${candidate.puntuacion?.toFixed(2)}`);
        doc.moveDown();
        if (index < candidates.length - 1) {
          doc.moveDown();
        }
      });
      doc.moveDown(2);
      doc.fontSize(10).text(`Total Preselected Candidates: ${candidates.length}`, { align: 'center' });
      doc.text('Generated by S.H.I.E.L.D. Recruitment System', { align: 'center' });
      doc.end();
      const pdfBuffer = await pdfPromise;
      const stream = new Readable();
      stream.push(pdfBuffer);
      stream.push(null);
      return new StreamableFile(stream, {
        type: 'application/pdf',
        disposition: 'attachment; filename=preselected_candidates.pdf',
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'No se pudo generar el reporte PDF de candidatos preseleccionados.',
        `Error: ${error.message || error}`,
      );
    }
  };
};