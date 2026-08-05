import "dotenv/config";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const client = new PrismaClient({
  adapter,
});

async function createUser() {
  await client.users.create({
    data: {
      username: "dasffds",
      email: "adfasd@gmail.com",
      password: "dsfafdsdsfafds",
    },
  });

  console.log("user created");
}

createUser();