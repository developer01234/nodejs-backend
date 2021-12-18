import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/users.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/models/roles.model";
import { UserRoles } from "./roles/models/user-roles.model";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    // connect DB
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
