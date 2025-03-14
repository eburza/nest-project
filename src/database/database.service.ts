import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // import prisma client

@Injectable()
// extend prisma client and implement onModuleInit interface
// to connect to the database when the module is initialized
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect(); // connect to the database
  }
}

// build employee api using prisma client
// 1. create employee
// 2. get all employees
// 3. get employee by id
// 4. update employee by id
// 5. delete employee by id
