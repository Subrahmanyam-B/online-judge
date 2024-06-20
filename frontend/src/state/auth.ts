import { atom } from "recoil";
import { getCookie } from "typescript-cookie";

const authAtom = atom<string>({
  key: "auth",
  // get initial state from local storage to enable user to stay logged in
  default: getCookie("accessToken") || "",
});

export { authAtom };
