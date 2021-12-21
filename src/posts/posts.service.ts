import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { CreatePostsDto } from "./dto/create-posts.dto";
import { Posts } from "./models/posts.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private postsRepos: typeof Posts,
    private fileService: FilesService
  ) {}

  async create(dto: CreatePostsDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postsRepos.create({ ...dto, image: fileName });
    return post;
  }
}
