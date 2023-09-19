export interface FormData {
  id: number;
  name: string;
  weight: string;
  bid: number;
  price: number;
  finalWeight: number;
}

export type FormDataContextType ={
  fishTypes: FormData[];
  calculatePrice: (bid: number, weight:number[]) => void;
  addPriceToFinalList: (data:FormData) => void
}