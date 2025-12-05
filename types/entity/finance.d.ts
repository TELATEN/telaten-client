export type TransactionType = 'income' | 'expense';

export interface Transaction {
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  transaction_date: string;
  id: string;
  business_id: string;
  created_at: string;
}

export interface CreateTransactionInput {
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  transaction_date: string;
}

export interface FinancialSummary {
  total_income: number;
  total_expense: number;
  net_profit: number;
  period_start: string;
  period_end: string;
}

export interface GetTransactionsParams {
  start_date?: string;
  end_date?: string;
  page?: number;
  size?: number;
}

export interface GetSummaryParams {
  period?: 'day' | 'week' | 'month' | 'year';
}

export interface PaginatedTransactions {
  items: Transaction[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
