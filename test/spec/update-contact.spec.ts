// test/contact.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';

import { faker } from '@faker-js/faker';

import { AppModule } from '../../src/app/app.module';
import { Contact } from '../../src/modules/contact/models/contact.model';
import { ContactFactory } from '../factories/contac.factory';

describe('Update Contact (e2e)', () => {
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
    // await contactModel.deleteMany({});

    await app.close();
  });

  describe('success cases', () => {
    it(`/api/contact/:id (PUT) should update contact`, async () => {
      const updateData = { name: faker.person.fullName() };
      const response = await request(app.getHttpServer())
        .put(`/api/contact/${contactId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', contactId);
      expect(response.body).toHaveProperty('name', updateData.name);
    });
  });
});
