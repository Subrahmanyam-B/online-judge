import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist({
//   key: "recoil-persist", // this is the key for localStorage
//   storage: sessionStorage, // or `localStorage`, default is `localStorage`
// });

const codeAtom = atom<string>({
  key: "code",
  default: "",
});

export { codeAtom };
