import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE } from '../environment/config/env.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { databaseName, databaseHost, databasePort } =
          configService.get(DATABASE);

        return {
          uri: `mongodb://${databaseHost}:${databasePort}`,
          dbName: databaseName,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
