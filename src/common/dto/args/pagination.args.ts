import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

/**
 * Pagination arguments for APIs that support offset/limit pagination.
 *
 * The PaginationArgs class provides the necessary properties to specify
 * pagination options in API queries.
 *
 * @class PaginationArgs
 *
 * @property {number} offset - The zero-based offset index for the pagination.
 * If not provided, the default value is 0.
 *
 * @property {number} limit - The maximum number of results to return in a single query.
 * If not provided, the default value is 10.
 */
@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  offset: number = 0;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  limit: number = 10;
}
