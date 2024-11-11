import { Document } from 'mongoose';

interface IPhoneNumbersDto {
  personal?: string;
  work?: string; //
}
interface Contact extends Document {
  name?: string;
  company?: string;
  profileImage?: string;
  email?: string;
  birthDate?: Date;
  phoneNumbers?: IPhoneNumbersDto;
  address?: string;
  city?: string;
  country?: string;
  __v?: number;
}

export interface IContactResponse extends Contact {
  message?: string;
}

export interface IContacts {
  _id: string;
  name: string;
  company: string;
  email: string;
  birthDate: string; // Se puede usar Date si prefieres que sea un objeto de tipo fecha
  phoneNumbers: IPhoneNumbersDto;
  address: string;
  city: string;
  state: string;
  __v: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
}
