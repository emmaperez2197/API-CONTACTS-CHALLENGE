import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CoreModule } from 'src/modules/core.module';
import { DatabaseModule } from 'src/settings/database/database.module';
import { EnvironmentModule } from 'src/settings/environment/environment.module';

@Module({
  imports: [CommonModule, CoreModule, EnvironmentModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
