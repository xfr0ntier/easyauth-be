import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "The registered email address of the user",
    example: "user@example.com",
    format: "email",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty({
    description: "The account password",
    example: "StrongPassword123!",
    minLength: 8,
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
