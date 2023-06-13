import { UserType } from '@/types';
import { create } from 'zustand';
type UserStore = {
  users: UserType[];
  setUsers: (user: UserType[]) => void;
};
const useStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users: UserType[]) => set({ users }),
}));

export default useStore;
