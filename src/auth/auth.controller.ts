import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signin")
  signin(@Body() userDto: CreateUserDto) {
    return this.authService.signin(userDto);
  }

  @Post("/signup")
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }
}
