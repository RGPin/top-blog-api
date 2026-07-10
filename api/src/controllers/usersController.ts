import type { Request, Response } from "express";

type SignupBody = {
  email: string;
  name?: string;
};

type LoginBody = {
  email: string;
};

const postSignup = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as SignupBody;
};

const postLogin = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as LoginBody;
};

const deleteLogout = async (req: Request, res: Response): Promise<void> => {
  // how to handle removing jwt from client? handle it from frontend?
};

export { postSignup, postLogin, deleteLogout };

// const postSignup = async (req: Request, res: Response): Promise<void> => {};

// const postSignup = async (req: Request, res: Response): Promise<void> => {};

// const postSignup = async (req: Request, res: Response): Promise<void> => {};

// const postSignup = async (req: Request, res: Response): Promise<void> => {};
