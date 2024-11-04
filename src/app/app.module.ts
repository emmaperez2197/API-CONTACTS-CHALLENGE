import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from 'src/contact/contact.module';

const { DB_HOST, DB_NAME, DB_PROTOCOL } = process.env;
@Module({
  imports: [
    ContactModule,
    MongooseModule.forRoot(`${DB_PROTOCOL}://${DB_HOST}/${DB_NAME}`),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
