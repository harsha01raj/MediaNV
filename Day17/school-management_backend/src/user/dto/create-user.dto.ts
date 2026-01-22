/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsIn, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "src/auth/enum/role.enum";

export class CreateUserDto {
  @ApiProperty({
    description: "Username of the user",
    example: "john_doe",
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "Email address of the user",
    example: "john@school.edu",
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: "Status of the user",
    enum: ['active', 'inactive'],
    example: 'active',
  })
  @IsIn(['active', 'inactive'], { message: 'status must be active or inactive' })
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    description: "Role of the user",
    enum: Role,
    example: Role.USER,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({
    description: "Password for the user",
    example: "Admin@123",
  })
  @IsString()
  password: string;
}