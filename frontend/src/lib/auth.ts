// import { ACCESS_TOKEN_SECRET } from "@/config";
// import jwt from "jsonwebtoken"
import { getAccessToken } from "./utils";

export type AuthPayload = {
    id: number;
    role: string;
    email: string;
    verified: boolean;
}

function parseJwt (token : string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const ValidateSignature = async () => {

    try {
      const signature = getAccessToken() || "";
      if (signature !== "") {
        // const payload = await jwt.decode(signature) as AuthPayload;
        const payload = parseJwt(signature) as AuthPayload;
        return payload;
      } else {
        return false;
      }
  
    } catch (error) {
      console.log(error);
      return false;
    }
  };

