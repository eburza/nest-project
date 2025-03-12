import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  /*
  GET /users
  GET /users/:id
  POST /users
  PATCH /users/:id (update) some can use PUT
  DELETE /users/:id
  */

  @Get() // GET /users or /users?role=value => query params
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [{ role }];
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post() // POST /user
  create(@Body() user: object) {
    return user;
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: object) {
    return { id, ...userUpdate };
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id') id: string) {
    return { id };
  }
}
