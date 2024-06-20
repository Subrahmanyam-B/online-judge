import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {getCookie , setCookie} from 'typescript-cookie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAccessToken = () => {
  const cookies = getCookie('accessToken');
  return cookies;
};

export const getRefreshToken = () => {
  const cookies = getCookie("refreshToken");

  return cookies;
};

export const updateAccessToken = (token: string) => {
  setCookie("accessToken", token);
};

export const updateRefreshToken = (token: string) => {
  setCookie("refreshToken", token);
};
