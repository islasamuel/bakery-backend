import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Represents a unit in the catalog of units.
 */
@ObjectType({ description: 'Represents a unit in the catalog of units.' })
@Entity({ name: 'cat_units' })
export class UnitType {
  @Field(() => String, { description: 'Unique identifier of the unit.' })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Field(() => String, { description: 'Description of the unit.' })
  @Column({ type: 'varchar', name: 'description', length: 100 })
  description: string;

  @Column({ type: 'bit', name: 'active', default: () => '1' })
  active: boolean;
}
