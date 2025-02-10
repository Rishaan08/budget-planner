
export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type ExpenseFormData = Omit<Expense, 'id' | 'created_at' | 'updated_at' | 'user_id'>;
