import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import { Role } from "../roles/models/roles.model";
import { UserRoles } from "../roles/models/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { Module } from "@nestjs/common";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
  exports: [UsersService],
})
export class UsersModule {}
