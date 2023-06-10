import { User } from './User';

export default interface UserRepository {
  create: (data: User) => void;
  newId: () => Promise<string>;
}
