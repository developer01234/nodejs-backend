import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "string" })
  @IsEmail({}, { message: "Invalid email" })
  @ApiProperty({ example: "example@example.com", description: "email" })
  readonly email: string;
  @IsString({ message: "string" })
  @Length(5, 20, { message: "few or many characters" })
  @ApiProperty({ example: "123", description: "password" })
  readonly password: string;
}
