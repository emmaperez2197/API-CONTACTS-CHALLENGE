import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';

const modules = [ContactModule];

@Module({
  imports: modules,
  exports: modules,
})
export class CoreModule {}
