import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UnitType } from './infrastructure/entities/unit.entity';
import { UnitInput } from './domain/dto/inputs/unit.input';
import { UnitUpdate } from './domain/dto/inputs/unit.update';
import { PaginationArgs, SearchArgs } from '../../../common/dto/args';
import { UnitsApplication } from './application/units.application';

/**
 * UnitsResolver is responsible for handling GraphQL operations related to Units,
 * such as creating, updating, removing, and retrieving units with pagination and search functionality.
 *
 * @class
 * @classdesc Integrates with UnitsApplication to perform CRUD operations on Units.
 */
@Resolver(() => UnitType)
export class UnitsResolver {
  constructor(private readonly application: UnitsApplication) {}

  /**
   * Creates a new Unit with the provided input data.
   *
   * @param {UnitInput} createUnitInput - The input data for creating a new Unit.
   * @return {Promise<UnitType>} - A promise that resolves to the newly created Unit.
   */
  @Mutation(() => UnitType)
  async create(@Args('UnitInput') unitInput: UnitInput): Promise<UnitType> {
    return await this.application.create(unitInput);
  }

  /**
   * Retrieves a paginated list of units based on the provided pagination and search arguments.
   *
   * @param {PaginationArgs} paginationArgs - The arguments for pagination, including page number and page size.
   * @param {SearchArgs} searchArgs - The arguments for searching, which may include filters or keywords.
   * @return {Promise<UnitType[]>} A promise that resolves to an array of units matching the specified criteria.
   */
  @Query(() => [UnitType], { name: 'units' })
  async findPagination(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<UnitType[]> {
    return await this.application.findPagination(paginationArgs, searchArgs);
  }

  /**
   * Updates an existing unit with the provided input data.
   *
   * @param {UnitUpdate} unitUpdate - The input data for updating the unit.
   * @return {Promise<UnitType>} A promise that resolves to the updated unit object.
   */
  @Mutation(() => UnitType)
  async update(@Args('UnitUpdate') unitUpdate: UnitUpdate): Promise<UnitType> {
    return await this.application.update(unitUpdate);
  }

  /**
   * Removes an entity based on the provided identifier.
   *
   * @param {string} id - The unique identifier of the entity to be removed.
   * @return {Promise<UnitType>} - A promise that resolves to a unit type indicating the completion of the removal operation.
   */
  @Mutation(() => UnitType)
  async remove(@Args('id', { type: () => Int }) id: string): Promise<UnitType> {
    return await this.application.remove(id);
  }
}
