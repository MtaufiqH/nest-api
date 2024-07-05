import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './users.service';
import { CreateUserDto } from './dto/create.users.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  /**
   * Method: GET
   * URL: /users
   * @param role @type {Role}
   * @description optional query param
   */
  @Get()
  getUsers(@Query('role') role?: Role) {
    this.logger.log('info', 'get all users');
    return this.usersService.getUsers(role);
  }

  /**
   * Method: GET
   * URL: /users/:id
   * @param id
   */
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  /**
   * Method: POST
   * URL: /users
   * @param body
   */
  @Post()
  addUser(@Body(ValidationPipe) body: CreateUserDto) {
    return this.usersService.addUser(body);
  }

  /**
   * Method: PATCH
   * URL: /users/:id
   * @param id @type {number}, @param body @type {object}
   */
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, body);
  }

  /**
   * Method: DELETE
   * URL: /users/:id
   * @param id
   */
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
