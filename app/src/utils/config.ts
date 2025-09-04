import "dotenv/config";

export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const PORT: string | number = process.env.PORT || 3000;
export const JWT_SECRET: string = process.env.JWT_SECRET || "lamesecret";
