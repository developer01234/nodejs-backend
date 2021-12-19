import { RolesService } from "./../roles/roles.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/users.model";

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
}
