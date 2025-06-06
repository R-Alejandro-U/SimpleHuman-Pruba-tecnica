import { Module } from '@nestjs/common';
import { CandidateModule } from './candidates/candidate.module';

@Module({
  imports: [CandidateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
