import type { ReactNode } from "react";

export interface FormSection {
  title: string;
  content: ReactNode;
}


export interface User{
    id?: string;
    name?: string;
    email?: string;
    address?: string;
    zip_code?: string;
}