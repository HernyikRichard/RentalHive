import { FormControl } from "@angular/forms";

export interface NewSublet {
  title: string;
  userId?: string;
  address: string;
  description: string;
  parameters: {
    type: string;
    size: number;
    heatingType: string;
  };
  images: string[];
}

export interface Sublet extends NewSublet {
  id?: string;
}