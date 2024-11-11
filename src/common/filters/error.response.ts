import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  statusCode: HttpStatus;
  timestamp: string;
  path: string;
  message: string;
  upstreamUrl?: string;
}
