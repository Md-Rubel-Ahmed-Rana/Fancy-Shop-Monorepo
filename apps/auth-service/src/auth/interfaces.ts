import { GetUserDto } from '@fancy-shop/shared-dtos';
import { Observable } from 'rxjs';

export interface UserServiceClient {
  GetUserByEmail(data: {
    email: string;
  }): Observable<{ id: string; email: string; password: string }>;
  GetUserById(data: { id: string }): Observable<GetUserDto>;
}
