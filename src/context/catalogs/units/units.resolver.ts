import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Unit } from './infrastructure/entities/unit.entity';
import { CreateUnitInput } from './domain/dto/inputs/create-unit.input';
import { UpdateUnitInput } from './domain/dto/inputs/update-unit.input';
import { PaginationArgs, SearchArgs } from '../../../common/dto/args';
import { UnitsApplication } from './application/units.application';

/**
 * UnitsResolver is responsible for handling GraphQL operations related to Units,
 * such as creating, updating, removing, and retrieving units with pagination and search functionality.
 *
 * @class
 * @classdesc Integrates with UnitsApplication to perform CRUD operations on Units.
 */
@Resolver(() => Unit)
export class UnitsResolver {
  constructor(private readonly application: UnitsApplication) {}

  /**
   * Creates a new Unit with the provided input data.
   *
   * @param {CreateUnitInput} createUnitInput - The input data for creating a new Unit.
   * @return {Promise<Unit>} - A promise that resolves to the newly created Unit.
   */
  @Mutation(() => Unit)
  async create(
    @Args('createUnitInput') createUnitInput: CreateUnitInput,
  ): Promise<Unit> {
    return await this.application.create(createUnitInput);
  }

  /**
   * Retrieves a paginated list of units based on the provided pagination and search arguments.
   *
   * @param {PaginationArgs} paginationArgs - The arguments for pagination, including page number and page size.
   * @param {SearchArgs} searchArgs - The arguments for searching, which may include filters or keywords.
   * @return {Promise<Unit[]>} A promise that resolves to an array of units matching the specified criteria.
   */
  @Query(() => [Unit], { name: 'units' })
  async findPagination(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Unit[]> {
    return await this.application.findPagination(paginationArgs, searchArgs);
  }

  /**
   * Updates an existing unit with the provided input data.
   *
   * @param {UpdateUnitInput} updateUnitInput - The input data for updating the unit.
   * @return {Promise<Unit>} A promise that resolves to the updated unit object.
   */
  @Mutation(() => Unit)
  async update(
    @Args('updateUnitInput') updateUnitInput: UpdateUnitInput,
  ): Promise<Unit> {
    return await this.application.update(updateUnitInput);
  }

  /**
   * Removes an entity based on the provided identifier.
   *
   * @param {number} id - The unique identifier of the entity to be removed.
   * @return {Promise<Unit>} - A promise that resolves to a unit type indicating the completion of the removal operation.
   */
  @Mutation(() => Unit)
  async remove(@Args('id', { type: () => Int }) id: number): Promise<Unit> {
    return await this.application.remove(id);
  }
}
