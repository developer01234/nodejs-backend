import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/models/users.model";
import { Posts } from "./models/posts.model";
import { FilesModule } from "src/files/files.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [SequelizeModule.forFeature([User, Posts]), FilesModule],
})
export class PostsModule {}
