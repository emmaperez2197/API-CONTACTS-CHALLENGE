import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './models/contact.model';

import { GetContact } from 'src/common/decorators/contact.decorator';
import { CheckContact } from 'src/common/decorators/check-contact.decorator';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { FilterDto } from './dto/filters.dto';
// import { CheckData } from 'src/common/decorators/check-data.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  createContact(@Body() payload: CreateContactDto) {
    return this.contactService.create(payload);
  }
  @Put(':id')
  @CheckContact()
  update(
    @GetContact() contact: Contact,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(contact, updateContactDto);
  }

  @Delete(':id')
  @CheckContact()
  remove(@GetContact() contact: Contact) {
    return this.contactService.remove(contact);
  }

  @Get()
  contacts(@Query() payload: FilterDto) {
    return this.contactService.getContacts(payload);
  }

  @Get(':id')
  @CheckContact()
  findOne(@GetContact() contact: Contact) {
    return contact;
  }
}
