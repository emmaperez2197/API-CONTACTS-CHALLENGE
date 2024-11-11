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

describe('Filters Contact (e2e)', () => {
  let app: INestApplication;
  let contactModel: Model<Contact>;
  let contacts;
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

    const contact = await factory.create();
    const contact1 = await factory.create();
    const contact2 = await factory.create();
    const contact3 = await factory.create();
    const contact4 = await factory.create();
    const contact5 = await factory.create();

    contacts = [
      contactMapper(contact),
      contactMapper(contact1),
      contactMapper(contact2),
      contactMapper(contact3),
      contactMapper(contact4),
      contactMapper(contact5),
    ];
  });
  afterEach(async () => {
    await contactModel.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('success cases', () => {
    it(`/api/contact (Get) should return contacts`, async () => {
      const response = await request(app.getHttpServer()).get(`/api/contact`);

      expect(response.status).toBe(200);
      expect(parseObject(response.body)).toEqual(parseObject(contacts));
    });

    it(`/api/contact (Get) should return contacts filtering by email`, async () => {
      const email = contacts[3].email;
      const expectedContacts = contacts.filter(
        (contact) => contact.email === email,
      );
      const response = await request(app.getHttpServer())
        .get(`/api/contact`)
        .query({ email });

      expect(response.status).toBe(200);
      expect(parseObject(response.body)).toEqual(parseObject(expectedContacts));
    });

    it(`/api/contact (Get) should return 404 because email not exist`, async () => {
      const email = 'email@notexits.com';

      const response = await request(app.getHttpServer())
        .get(`/api/contact`)
        .query({ email });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain(`Not Found`);
    });
  });
});
