import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  read(@Query('role') role?: string) {
    return this.usersService.read(role);
  }

  @Get(':id')
  readOne(@Param('id') id: string) {
    return this.usersService.readOne(+id);
  }

  @Post()
  create(@Body() user: { name: string; role: string }) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() userUpdate: { name?: string; role?: string },
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
