import { RolesService } from "./../roles/roles.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/users.model";
import { addRoleDto } from "./dto/add-role.dto";
import { banUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepos: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    // created user
    const user = await this.userRepos.create(dto);
    const role = await this.roleService.getRole("ADMIN");
    await user.$set("role", [role.id]);
    user.role = [role];
    return user;
  }
  async getUsers() {
    // Find all users
    const users = await this.userRepos.findAll({ include: { all: true } });
    return users;
  }

  async getEmail(email: string) {
    const user = await this.userRepos.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: addRoleDto) {
    const user = await this.userRepos.findByPk(dto.userId);
    const role = await this.roleService.getRole(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
  async banUser(dto: banUserDto) {
    const user = await this.userRepos.findByPk(dto.userId);
    user.banned = true;
    user.banReason = dto.banReason;
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    await user.save();
    return user;
  }
}
