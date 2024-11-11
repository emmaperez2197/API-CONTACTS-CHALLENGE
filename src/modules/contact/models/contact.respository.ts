import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseRepository } from 'src/common/repository/database.repository';
import { Contact } from './contact.model';

@Injectable()
export class ContactRepository extends DatabaseRepository<Contact> {
  constructor(@InjectModel(Contact.name) private ContactModel: Model<Contact>) {
    super(ContactModel);
  }
}
