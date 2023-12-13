import { User } from "firebase/auth";
import { create } from "zustand";

enum Roles {
  READ = "READ",
  WRITE = "WRITE",
}

interface IAdmin {
  email: string;
  roles: Roles[];
}

type State = {
  admin: IAdmin | null;
  adminDetails: User | null;
};

type Action = {
  setAdmin: (admin: IAdmin) => void;
  setAdminDetails: (admin: User) => void;
};

export const useAdminStore = create<State & Action>((set) => ({
  admin: null,
  adminDetails: null,
  setAdmin: (data) => set({ admin: data }),
  setAdminDetails: (adminData) => set({ adminDetails: adminData }),
}));
