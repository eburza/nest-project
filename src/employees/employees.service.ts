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
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  // find all employees
  async findAll(role?: UserRole) {
    // if role is provided, find all employees with the given role
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.employee.findMany();
  }

  // find one employee
  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id, // because key and value are the same => id: id
      },
    });
  }

  // update employee
  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto, // updateEmployeeDto is the data to update
    });
  }

  // remove employee
  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
