import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "src/roles/models/roles.model";
import { UserRoles } from "src/roles/models/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

// create table for DB
@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "100" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "example@example.com", description: "email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: "123", description: "password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @ApiProperty({ example: "true", description: "ban" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;
  @ApiProperty({ example: "breaking community rules" })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  role: Role[];
}
