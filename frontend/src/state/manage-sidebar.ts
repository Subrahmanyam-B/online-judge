import { atom } from "recoil";

const manageSidebarAtom = atom<string>({
  key: "manage-sidebar",
  default: "create",
});

export { manageSidebarAtom };
