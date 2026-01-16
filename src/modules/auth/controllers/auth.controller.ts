import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { JwtAuthGuard } from "../security/jwt.guard";
import { LoginDto } from "../dtos/login.dto";
import { SignUpDto } from "../dtos/signup.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User successfully created." })
  @ApiResponse({ status: 400, description: "Validation failed." })
  async signUp(@Body() registerDto: SignUpDto) {
    const user = await this.authService.signUp(
      registerDto.name,
      registerDto.email,
      registerDto.password
    );

    if (!user) {
      throw new InternalServerErrorException(
        "Something went wrong, try again later."
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("profile")
  @ApiOperation({ summary: "Get current user profile" })
  getProfile(@Request() req: any) {
    return "Hello " + req.user.email;
  }
}
