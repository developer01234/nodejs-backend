import { RolesGuard } from "./../auth/roles.guard";
import { JwtGuard } from "./../auth/jwt.guard";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { addRoleDto } from "./dto/add-role.dto";
import { Body, UseGuards } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/users.model";
import { Roles } from "../auth/roles.decorator";
import { banUserDto } from "./dto/ban-user.dto";

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
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    // find user
    return this.UsersService.getUsers();
  }

  @ApiOperation({ summary: "Add roles" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/role")
  addRole(@Body() dto: addRoleDto) {
    // add role
    return this.UsersService.addRole(dto);
  }

  @ApiOperation({ summary: "Banned Users" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/ban")
  Banned(@Body() dto: banUserDto) {
    // user banned
    return this.UsersService.banUser(dto);
  }
}
