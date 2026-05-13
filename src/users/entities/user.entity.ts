import { Exclude } from 'class-transformer';
import { Gender } from '../../../generated/prisma/client';

export class UserEntity {
  id!: number;
  username!: string;
  email!: string;

  @Exclude()
  password!: string;

  birthdate!: Date;
  location?: string | null;
  bio?: string | null;
  gender?: Gender | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
