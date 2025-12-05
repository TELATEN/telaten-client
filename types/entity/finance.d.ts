import type { Achievement } from './achievement';

export type TransactionType = 'income' | 'expense';
export type PaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'E_WALLET' | 'DEBIT_CARD' | 'CREDIT_CARD';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  is_default: boolean;
}

export interface CreateCategoryInput {
  name: string;
  type: TransactionType;
  icon: string;
  is_default?: boolean;
}

export interface Transaction {
  amount: number;
  type: TransactionType;
  category: string;
  category_id: string;
  category_name: string;
  payment_method: PaymentMethod;
  description: string;
  transaction_date: string;
  id: string;
  business_id: string;
  created_at: string;
  unlocked_achievement?: Achievement;
}

export interface CreateTransactionInput {
  amount: number;
  type: TransactionType;
  category_id: string;
  category_name: string;
  payment_method: PaymentMethod;
  description: string;
  transaction_date: string;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface FinancialSummary {
  total_income: number;
  total_expense: number;
  net_profit: number;
  period_start: string;
  period_end: string;
  income_breakdown: CategoryBreakdown[];
  expense_breakdown: CategoryBreakdown[];
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
