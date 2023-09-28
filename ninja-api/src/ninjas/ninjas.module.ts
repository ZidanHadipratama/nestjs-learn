import { Module } from '@nestjs/common';
import { NinjasService } from './ninjas.service';
import { NinjasController } from './ninjas.controller';

@Module({
  providers: [NinjasService],
  controllers: [NinjasController]
})
export class NinjasModule {}
