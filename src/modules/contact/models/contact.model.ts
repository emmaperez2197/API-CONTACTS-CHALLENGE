import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contact extends Document {
  @Prop()
  name: string;

  @Prop()
  company: string;

  @Prop()
  profileImage: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  birthDate: Date;

  @Prop({
    type: {
      work: { type: String, required: false },
      personal: { type: String, required: false },
    },
    _id: false,
    validate: {
      validator: (v: { work?: string; personal?: string }) =>
        !!(v.work || v.personal),
    },
    required: true,
  })
  phoneNumbers: { work?: string; personal?: string };

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
