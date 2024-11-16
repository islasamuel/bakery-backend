import { Module } from '@nestjs/common';
import { UnitsService } from './infrastructure/units.service';
import { UnitsResolver } from './units.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './infrastructure/entities/unit.entity';
import { UnitsApplication } from './application/units.application';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitsResolver, UnitsService, UnitsApplication],
})
export class UnitsModule {}
