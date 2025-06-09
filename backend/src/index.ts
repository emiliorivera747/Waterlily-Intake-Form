import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import prisma from "./prisma-client"; // Adjust the import path as necessary

config();
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("combined"));

app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.patch("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { address, zip_code } = req.body;
  const validId = Number(id);
  
  try {
    const user = await prisma.user.update({
      where: { id: validId },
      data: {
        address,
        zip_code,
      },
    });

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
