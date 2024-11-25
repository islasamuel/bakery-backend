import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from '../../../../common/dto/args';
import { CreateUnitInput } from '../domain/dto/inputs/create-unit.input';
import { UpdateUnitInput } from '../domain/dto/inputs/update-unit.input';

/**
 * Service responsible for managing `Unit` entities.
 */
@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly repository: Repository<Unit>,
  ) {}

  /**
   * Creates a new Unit entity and saves it to the repository.
   *
   * @param {Unit} data - The data for the unit to be created.
   * @return {Promise<Unit>} - A promise that resolves to the created unit.
   */
  async create(data: CreateUnitInput): Promise<Unit> {
    const dataCreated = this.repository.create(data);
    return await this.repository.save(dataCreated);
  }

  /**
   * Retrieves a paginated list of units based on the provided pagination and search arguments.
   *
   * @param {PaginationArgs} paginationArgs - An object containing pagination parameters such as limit and offset.
   * @param {SearchArgs} searchArgs - An object containing search parameters.
   * @return {Promise<Unit[]>} A promise that resolves to an array of units matching the pagination and search criteria.
   */
  async findPagination(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Unit[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.repository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where('active = :active', { active: true });

    if (search) {
      queryBuilder.andWhere(
        'LOWER(description) LIKE :search OR id LIKE :search',
        { search: `%${search}%` },
      );
    }
    return await queryBuilder.getMany();
  }

  /**
   * Retrieves all active units from the repository.
   *
   * @return {Promise<Unit[]>} A promise that resolves to an array of active units.
   */
  async findAll(): Promise<Unit[]> {
    return await this.repository.find({
      where: { active: true },
    });
  }

  /**
   * Finds a unit by its unique identifier.
   *
   * @param {string} id - The unique identifier of the unit to find.
   * @return {Promise<Unit>} A promise that resolves to the found unit.
   */
  async findById(id: string): Promise<Unit> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  /**
   * Finds and returns a Unit that matches the given description and is active.
   *
   * @param {string} description - The description to search for.
   * @return {Promise<Unit>} A promise that resolves to the found Unit, or null if no matching unit is found.
   */
  async findByDescription(description: string): Promise<Unit> {
    return await this.repository.findOne({
      where: { description, active: true },
    });
  }

  /**
   * Updates an existing entry in the repository with new data.
   *
   * @param {UpdateUnitInput} data - The new data to update the existing entry.
   * @return {Promise<Unit>} - A promise that resolves to the updated entry.
   */
  async update(data: UpdateUnitInput): Promise<Unit> {
    const dataUpdated: Unit = await this.repository.preload({ ...data });
    return await this.repository.save(dataUpdated);
  }

  /**
   * Deactivates an entity by its identifier.
   *
   * @param {number} id - The identifier of the entity to be deactivated.
   * @return {Promise<Unit>} A promise that resolves to the updated entity.
   */
  async remove(id: string): Promise<Unit> {
    const data: Unit = await this.findById(id);
    data.active = false;
    return await this.update(data);
  }
}
