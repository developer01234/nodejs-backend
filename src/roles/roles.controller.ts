import { CreateRoleDto } from "./dto/create-role.dto";
import { RolesService } from "./roles.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get("/:value")
  getValue(@Param("value") value: string) {
    return this.roleService.getRole(value);
  }
}
