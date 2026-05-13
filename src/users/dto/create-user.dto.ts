import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Gender } from '../../../generated/prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsDate()
  @Type(() => Date)
  birthdate!: Date;

  @IsString()
  @IsOptional()
  location?: string;

  @MaxLength(500)
  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}
