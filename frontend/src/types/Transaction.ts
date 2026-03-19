export interface Transaction {
  id: number;
  categoryId: number;
  categoryName?: string; 
  amount: number;
  description: string;
  date: string; 
}
