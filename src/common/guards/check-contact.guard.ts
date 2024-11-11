import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { ContactRepository } from 'src/modules/contact/models/contact.respository';

@Injectable()
export class CheckContactGuard implements CanActivate {
  constructor(private readonly repository: ContactRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Aquí se extrae el id del contacto de los params, body o user (si corresponde)
    const contactId = request.params.id || request.body.id;

    if (!contactId) {
      throw new NotFoundException('Contact ID not provided');
    }

    // Aquí buscamos el contacto en la base de datos
    const contact = await this.repository.findOne({ _id: contactId });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Adjuntar el contacto encontrado al request para que esté disponible en el controlador
    request['contact'] = contact;
    return true;
  }
}
