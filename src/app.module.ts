import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/users.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/models/roles.model";
import { UserRoles } from "./roles/models/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { Posts } from "./posts/models/posts.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    // connect DB
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Posts],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
