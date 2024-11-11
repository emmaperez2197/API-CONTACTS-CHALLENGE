import { Injectable, NotFoundException } from '@nestjs/common';

import { Contact } from './models/contact.model';
import { ContactRepository } from './models/contact.respository';
import { ApiResponse, IContactResponse } from './interfaces/contact-interface';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

import { SUCCESS_MESSAGES } from 'src/common/messages/success';

import { FilterDto } from './dto/filters.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async create(payload: CreateContactDto): Promise<IContactResponse> {
    const contactToSave = payload as Contact;
    const contact = await this.contactRepository.createOrUpdate(contactToSave);
    return contact;
  }

  async update(contact: any, updateContactDto: UpdateContactDto) {
    const contactUpdated = { ...contact, ...updateContactDto };

    const format = Object.assign(contactUpdated._doc, updateContactDto);
    return await this.contactRepository.createOrUpdate(format);
  }

  async remove(contact: Contact): Promise<ApiResponse<string>> {
    await this.contactRepository.delete(contact);

    return {
      status: 'success',
      message: SUCCESS_MESSAGES.DELETED(contact),
    };
  }

  async getContacts(payload: FilterDto) {
    const filters = {
      ...(payload.city && { city: payload.city }),
      ...(payload.email && { email: payload.email }),
      ...(payload.state && { state: payload.state }),
      ...(payload.personalPhone && {
        'phoneNumbers.personal': payload.personalPhone,
      }),
      ...(payload.workPhone && { 'phoneNumbers.work': payload.workPhone }),
    };
    const contacts = await this.contactRepository.find(filters);

    if (!contacts || !contacts.length) {
      throw new NotFoundException();
    }

    return contacts;
  }
}
