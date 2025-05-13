import { verifyToken } from "@/utils/verify-token";
import { NextFunction, Request, Response } from "express";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized", name: "TokenError" });
    return;
  }

  try {
    const user = await verifyToken(authHeader.substring(7));
    if (!user) {
      res.status(401).json({ message: "Unauthorized", name: "TokenError" });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: error.message, name: error.name });
  }
};
