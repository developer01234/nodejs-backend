import { JwtGuard } from "./../auth/jwt.guard";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Body, UseGuards } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/users.model";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    // create user
    return this.UsersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Find user" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    // find user
    return this.UsersService.getUsers();
  }
}
