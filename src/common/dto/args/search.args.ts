import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

/**
 * SearchArgs class is used as an argument type for querying searches.
 *
 * This class provides structure for search arguments.
 *
 * @class SearchArgs
 */
@ArgsType()
export class SearchArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
