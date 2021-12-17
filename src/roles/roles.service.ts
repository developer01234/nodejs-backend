import { Role } from "./models/roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepos: typeof Role) {}
  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepos.create(dto);
    return role;
  }
  async getRole(value: string) {
    const role = await this.roleRepos.findOne({ where: { value } });
    return role;
  }
}
