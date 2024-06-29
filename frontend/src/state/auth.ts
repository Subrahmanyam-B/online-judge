import { AuthPayload } from "@/lib/auth";
import { atom } from "recoil";
import {recoilPersist} from'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // this is the key for localStorage
  storage: sessionStorage, // or `localStorage`, default is `localStorage`
});

const authAtom = atom<{isAuthenticated: boolean , user : AuthPayload | null}>({
  key: "auth",
  default: { isAuthenticated: false , user : null},
  effects_UNSTABLE: [persistAtom],
});

export { authAtom };
