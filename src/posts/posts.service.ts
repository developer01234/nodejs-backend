import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePostsDto } from "./dto/create-posts.dto";
import { Posts } from "./models/posts.model";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postsRepos: typeof Posts) {}

  async create(dto: CreatePostsDto, image: any) {
    const post = await this.postsRepos.create();
    throw new Error("Method not implemented.");
  }
}
