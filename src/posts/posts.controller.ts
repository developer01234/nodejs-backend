import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePostsDto } from "./dto/create-posts.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostsDto, @UploadedFile() image) {
    return this.postsService.create(dto, image);
  }
}
