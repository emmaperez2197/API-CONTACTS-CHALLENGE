// test/contact.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from '../../src/app/app.module';
import { Contact } from '../../src/modules/contact/models/contact.model';
import { ContactFactory } from '../factories/contac.factory';
import { contactMapper } from '../utils/contact.util';
import { parseObject } from '../utils/object.util';

describe('Find one Contact (e2e)', () => {
  let app: INestApplication;
  let contactModel: Model<Contact>;
  let contactId: any | string;
  let contact: Contact;

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

    contact = await factory.create();
    contactId = contact._id.toString();
  });
  afterEach(async () => {
    await contactModel.deleteMany({});
  });

  afterAll(async () => {
    // await contactModel.deleteMany({});
    await app.close();
  });

  describe('success cases', () => {
    it(`/api/contact/:id (Get) should find one contact`, async () => {
      const expectedContact = contactMapper(contact);
      const response = await request(app.getHttpServer()).get(
        `/api/contact/${contactId}`,
      );

      expect(response.status).toBe(200);
      expect(parseObject(response.body)).toEqual(parseObject(expectedContact));
    });
  });
});
