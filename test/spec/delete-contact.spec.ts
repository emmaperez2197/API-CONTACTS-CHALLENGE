// test/contact.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from '../../src/app/app.module';
import { Contact } from '../../src/modules/contact/models/contact.model';
import { ContactFactory } from '../factories/contac.factory';
import { faker } from '@faker-js/faker/.';

describe('Delete Contact (e2e)', () => {
  let app: INestApplication;
  let contactModel: Model<Contact>;
  let contactId: any | string;
  let createdContact: Contact;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true,
      }),
    );
    app.setGlobalPrefix('api');
    await app.init();

    contactModel = moduleFixture.get<Model<Contact>>(
      getModelToken(Contact.name),
    );

    await contactModel.deleteMany({});
  });

  beforeEach(async () => {
    const factory: ContactFactory = new ContactFactory(contactModel);

    createdContact = await factory.create();
    contactId = createdContact._id.toString();
  });

  afterEach(async () => {
    await contactModel.deleteMany({});
  });
  afterAll(async () => {
    await app.close();
  });

  describe('success cases', () => {
    it(`/api/contact/:id (DELETE) should delete contact`, async () => {
      const response = await request(app.getHttpServer()).delete(
        `/api/contact/${contactId}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty(
        'message',
        `The contact with email ${createdContact.email} was successfully deleted.`,
      );
    });

    it(`/api/contact/:id (DELETE) should return 404 because contact not exist`, async () => {
      const idNotExist = faker.database.mongodbObjectId();
      const response = await request(app.getHttpServer()).delete(
        `/api/contact/${idNotExist}`,
      );

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Contact not found');
    });
  });
});
