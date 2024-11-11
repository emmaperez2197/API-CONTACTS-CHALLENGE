import { Contact } from 'src/modules/contact/models/contact.model';

export const contactMapper = (contact: Contact) => {
  return {
    _id: contact._id.toString(),
    name: contact.name,
    company: contact.company,
    ...(contact.profileImage && { profileImage: contact.profileImage }),
    email: contact.email,
    birthDate: contact.birthDate.toISOString(),
    phoneNumbers: contact.phoneNumbers,
    address: contact.address,
    city: contact.city,
    state: contact.state,
    __v: 0,
  };
};
