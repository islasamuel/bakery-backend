import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

/**
 * Input type for creating a unit.
 */
@InputType({
  description: 'Input type for creating a unit',
})
export class CreateUnitInput {
  @Field(() => String, { description: 'Description of the unit' })
  @MaxLength(100, {
    message: 'Description must be at most 100 characters long',
  })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;
}
