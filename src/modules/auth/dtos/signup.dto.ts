import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class SignUpDto {
  @ApiProperty({
    description: "The unique email address for the user account",
    example: "john.doe@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe",
    minLength: 3,
  })
  @IsString()
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  name: string;

  @ApiProperty({
    description:
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    example: "P@ssword123!",
    minLength: 8,
    format: "password",
  })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password is too weak. Must include uppercase, lowercase, number, and special character.",
  })
  password: string;
}
