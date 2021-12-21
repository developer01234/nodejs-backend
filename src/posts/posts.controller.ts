import { Body, Controller, Post, UploadedFile } from "@nestjs/common";
import { CreatePostsDto } from "./dto/create-posts.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  createPost(@Body() dto: CreatePostsDto, @UploadedFile() image) {
    this.postsService.create(dto, image);
  }
}
