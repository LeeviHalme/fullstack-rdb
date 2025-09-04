import { ErrorRequestHandler, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { JwtPayload } from "../types";

// middleware for error handling
export const errorHandler: ErrorRequestHandler = (error, _, response, next) => {
  console.error(error.message);
  console.log("ErrorName:", error.name);

  if (error.name === "SequelizeValidationError" || error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).send({ error: "Database error" });
  } else if (error.name === "AuthenticationError") {
    return response.status(401).send({ error: error.message });
  }

  next(error);
};

// middleware for authentication
export const validateAndInjectJwt: RequestHandler = (request, response, next) => {
  const authHeader = request.get("authorization");

  request.token = undefined;
  request.userId = undefined;

  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // inject token and userId into request object
      request.token = token;
      request.userId = decoded.id;
    } catch (error) {
      return next(new Error("Token invalid", { cause: "AuthenticationError" }));
    }
  } else {
    return next(new Error("Token missing or invalid", { cause: "AuthenticationError" }));
  }

  next();
};
