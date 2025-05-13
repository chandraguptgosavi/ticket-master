import { IUser } from "@/types";
import jwt from "jsonwebtoken";

export async function verifyToken(token: string): Promise<IUser> {
  const result = await new Promise<IUser>((resolve, reject) => {
    const secretKey = process.env.JWT_SECRET!;
    const key = Buffer.from(secretKey, "base64");

    jwt.verify(token, key, { algorithms: ["HS512"] }, (err, payload) => {
      if (err) {
        reject(err);
      }
      resolve(payload as IUser);
    });
  });

  return result;
}
