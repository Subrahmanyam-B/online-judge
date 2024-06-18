import { AuthPayload } from "../../dto/user.dto";

declare global {
    namespace Express {
      export interface Request {
        user?: AuthPayload;
      }
    }
  }
  