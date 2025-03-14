import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { UserRole } from 'src/users/dto/create-user.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  // create a logger for the controller
  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    // log the creation of an employee
    this.logger.log('Creating employee');
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: UserRole) {
    // log the finding of all employees with the ip address
    this.logger.log(
      `Request for all employees ${ip}`,
      EmployeesController.name,
    );
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // log the finding of an employee by id
    this.logger.log('Finding employee by id');
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    // log the updating of an employee
    this.logger.log('Updating employee');
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // log the removal of an employee
    this.logger.log('Removing employee');
    return this.employeesService.remove(+id);
  }
}
