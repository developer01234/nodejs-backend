import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
	constructor(private UsersService: UsersService) {}

	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.UsersService.createUser;
	}
}
