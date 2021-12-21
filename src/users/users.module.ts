import { Posts } from "./../posts/models/posts.model";
import { AuthModule } from "./../auth/auth.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import { Role } from "../roles/models/roles.model";
import { UserRoles } from "../roles/models/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { forwardRef, Module } from "@nestjs/common";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Posts]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
