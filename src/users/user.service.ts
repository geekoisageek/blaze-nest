import { PasswordService } from './../common/password.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => new UserEntity(user));
  }

  async createUser(body: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...body,
        password: await this.passwordService.hash(body.password),
      },
    });

    return new UserEntity(user);
  }
}
