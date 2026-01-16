import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(name: string, email: string, pass: string) {
    const exists = await this.usersService.findOne(email);

    if (exists) {
      throw new ConflictException("User already exists");
    }

    return this.usersService.create(name, email, pass);
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    const isMatch = user ? await bcrypt.compare(pass, user.password) : false;

    if (!user || !isMatch) {
      this.logger.warn(`Failed login attempt: ${email}`);
      throw new UnauthorizedException("Invalid credentials");
    }

    this.logger.log(`User logged in successfully: ${email}`);

    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
