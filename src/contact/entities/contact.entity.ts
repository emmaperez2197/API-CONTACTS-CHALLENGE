import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

export class Contact {
  @Prop()
  name: string;

  @Prop()
  company: string;

  @Prop()
  profileImage: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  birthDate: Date;

  @Prop({
    type: {
      work: { type: String, required: true },
      personal: { type: String, required: true },
    },
    required: true,
  })
  phoneNumbers: { work: string; personal: string };

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
