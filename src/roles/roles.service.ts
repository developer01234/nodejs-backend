import { CreateRoleDto } from "./dto/create-role.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RolesService {
  async createRole(dto: CreateRoleDto) {}
  async getRole(value: String) {}
}
