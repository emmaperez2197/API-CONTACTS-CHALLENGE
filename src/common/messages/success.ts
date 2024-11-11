import { Contact } from 'src/modules/contact/models/contact.model';

export const SUCCESS_MESSAGES = {
  DELETED: (entity: Contact) =>
    `The contact with email ${entity.email} was successfully deleted.`,
};
