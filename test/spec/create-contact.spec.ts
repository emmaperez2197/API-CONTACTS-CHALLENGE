// test/contact.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from '../../src/app/app.module';
import { Contact } from '../../src/modules/contact/models/contact.model';
import { ContactFactory } from '../factories/contac.factory';

describe('Create Contact (e2e)', () => {
  let app: INestApplication;
  let contactModel: Model<Contact>;
  const factory: ContactFactory = new ContactFactory(contactModel);

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

  afterEach(async () => {
    await contactModel.deleteMany({});
  });
  afterAll(async () => {
    await app.close();
  });

  const newContact = factory.payloadToCreate();

  describe('success cases', () => {
    it('/api/contact (POST) should create a new contact', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contact')
        .send(newContact);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('__v', 0);
      expect(response.body).toMatchObject(newContact);
    });
  });

  describe('Errors cases', () => {
    it('/api/contact (POST) should return error when  fields are number', async () => {
      const fields = ['name', 'company', 'email', 'address', 'city', 'state'];

      for (const field of fields) {
        const modifiedContact = { ...newContact };

        modifiedContact[field] = 1235;
        const response = await request(app.getHttpServer())
          .post('/api/contact')
          .send(modifiedContact);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain(`${field} must be a string`);
      }
    });

    it('/api/contact (POST) should return error when  field are not format email', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contact')
        .send({ ...newContact, email: 'emailError' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain(`email must be an email`);
    });
  });
});
