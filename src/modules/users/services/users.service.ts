import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(name: string, email: string, pass: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    this.logger.log(`User created successfully: ${email}`);

    return newUser;
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
