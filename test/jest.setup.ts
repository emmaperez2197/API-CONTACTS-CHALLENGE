import { config } from 'dotenv';
config({ path: '.env.test' }); // carga .env.test antes de inicializar ConfigModule

import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env.test', // asegura que .env.test sea el archivo de entorno
});
