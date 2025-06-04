/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param } from '@nestjs/common';
import { CandidateService } from './candidate.service';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  async GetCandidateById (@Param('id') id: string) {
    try {
      const candidate: unknown = await this.candidateService.GetCandidateById();
      return candidate;
    } catch (error) {
      
    };
  }
}
