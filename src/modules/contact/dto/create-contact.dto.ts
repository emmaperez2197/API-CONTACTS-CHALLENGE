import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

class PhoneNumbersDto {
  @IsString()
  @IsOptional()
  work?: string;

  @IsString()
  @IsOptional()
  personal?: string;
}

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @ValidateIf((o) => !o.phoneNumbers?.work && !o.phoneNumbers?.personal)
  @IsNotEmpty({ message: 'You must send a personal or work phone number' })
  phoneNumbers: PhoneNumbersDto;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}
