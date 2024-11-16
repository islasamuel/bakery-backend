import { CreateUnitInput } from './create-unit.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, Min } from 'class-validator';

/**
 * Input type for updating an existing unit.
 * Inherits properties from CreateUnitInput and makes them optional.
 *
 * @extends PartialType<CreateUnitInput>
 */
@InputType({
  description:
    'Input type for updating an existing unit. Inherits properties from CreateUnitInput and makes them optional.',
})
export class UpdateUnitInput extends PartialType(CreateUnitInput) {
  @Field(() => Int, {
    description:
      'The unique identifier of the unit. Must be a positive integer.',
  })
  @IsPositive({
    message: 'The ID must be a positive integer.',
  })
  @Min(1, {
    message: 'The ID must be at least 1.',
  })
  @IsNotEmpty({
    message: 'The ID field cannot be empty.',
  })
  id: number;
}
