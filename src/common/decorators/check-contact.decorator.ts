import { applyDecorators, UseGuards } from '@nestjs/common';
import { CheckContactGuard } from '../guards/check-contact.guard';

export function CheckContact() {
  return applyDecorators(UseGuards(CheckContactGuard));
}
