import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Get } from "@nestjs/common";

@Controller("users")
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    // create user
    return this.UsersService.createUser(userDto);
  }

  @Get()
  getAll() {
    // find user
    return this.UsersService.getUsers();
  }
}
