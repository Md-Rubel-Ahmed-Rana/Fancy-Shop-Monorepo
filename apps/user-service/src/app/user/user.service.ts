import { GetUserDto } from '@fancy-shop/shared-dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll(): Promise<GetUserDto[]> {
    return Promise.resolve([
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        requesterId: '1',
      },
    ]);
  }
}
