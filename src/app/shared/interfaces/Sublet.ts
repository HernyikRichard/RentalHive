export interface Sublet {
  id?: string;
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

