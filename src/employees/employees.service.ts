// remove it after testing
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/users/dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class EmployeesService {
  // inject database service
  constructor(private readonly databaseService: DatabaseService) {}

  // create employee
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return 'This action adds a new employee';
  }

  // find all employees
  async findAll(role?: UserRole) {
    return `This action returns all employees`;
  }

  // find one employee
  async findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  // update employee
  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return `This action updates a #${id} employee`;
  }

  // remove employee
  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
