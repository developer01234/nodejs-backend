import { UsersService } from "./../users/users.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/models/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signin(userDto: CreateUserDto) {
    const user = await this.validUser(userDto);
    return this.Token(user);
  }

  private async validUser(userDto: CreateUserDto) {
    const user = await this.userService.getEmail(userDto.email);
    const confirmPassword = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if() {}
    return user;
  }

  async signup(userDto: CreateUserDto) {
    const person = await this.userService.getEmail(userDto.email);
    if (person) {
      throw new HttpException("Email busy", HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hash,
    });
    return this.Token(user);
  }

  private async Token(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }
}
