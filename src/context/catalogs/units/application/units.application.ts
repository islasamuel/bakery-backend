import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UnitsService } from '../infrastructure/units.service';
import { UnitInput } from '../domain/dto/inputs/unit.input';
import { UnitType } from '../infrastructure/entities/unit.entity';
import { PaginationArgs, SearchArgs } from '../../../../common/dto/args';
import { UnitUpdate } from '../domain/dto/inputs/unit.update';

@Injectable()
export class UnitsApplication {
  constructor(private readonly service: UnitsService) {}

  /**
   * Creates a new unit based on the provided data.
   *
   * @param {UnitInput} data - The input data to create a new unit.
   * @return {Promise<UnitType>} The newly created unit.
   * @throws {BadRequestException} If the unit with the provided description already exists.
   */
  async create(data: UnitInput): Promise<UnitType> {
    const exist: UnitType = await this.service.findByDescription(data.description);
    if (exist) throw new BadRequestException('The infomation already exists');
    return await this.service.create(data);
  }

  /**
   * This method retrieves paginated results based on the given pagination and search arguments.
   *
   * @param {PaginationArgs} paginationArgs - The arguments that specify the pagination details such as page number and page size.
   * @param {SearchArgs} searchArgs - The arguments that specify the search criteria and filters.
   * @return {Promise<UnitType[]>} A promise that resolves to an array of Unit objects representing the paginated results.
   */
  async findPagination(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<UnitType[]> {
    return await this.service.findPagination(paginationArgs, searchArgs);
  }

  /**
   * Updates an existing unit with the provided data.
   *
   * @param {UnitUpdate} data - The input data containing update information for*/
  async update(data: UnitUpdate): Promise<UnitType> {
    const exist: UnitType = await this.service.findById(data.id);
    if (!exist) throw new NotFoundException('Infomation not found');
    return await this.service.update(data);
  }

  /**
   * Removes a unit identified by the given ID.
   *
   * @param {string} id - The ID of the unit to be removed.
   * @return {Promise<UnitType>} A promise that resolves to the removed unit.
   * @throws {NotFoundException} If no unit with the given ID is found.
   */
  async remove(id: string): Promise<UnitType> {
    const exist: UnitType = await this.service.findById(id);
    if (!exist) throw new NotFoundException('Infomation not found');
    return await this.service.remove(id);
  }
}
