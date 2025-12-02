export interface User {
  id: string;
  name: string;
  businessName: string;
  level: number;
  levelTitle: string;
  xp: number;
  xpToNextLevel: number;
  isBusinessOpen: boolean;
  avatar?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  xpReward: number;
  status: 'pending' | 'in-review' | 'completed';
  category: string;
  autoGenerate?: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  timestamp: string;
  notes?: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  profit: number;
}

export const mockUser: User = {
  id: '1',
  name: 'Bu Siti',
  businessName: 'Warung Siti',
  level: 1,
  levelTitle: 'Pedagang Pemula',
  xp: 350,
  xpToNextLevel: 1000,
  isBusinessOpen: true,
};

export const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Catat Penjualan Hari Ini',
    description: 'Ceritakan apa saja yang terjual hari ini. TLATEN akan membantu mencatatnya.',
    difficulty: 'mudah',
    xpReward: 50,
    status: 'pending',
    category: 'Keuangan',
  },
  {
    id: '2',
    title: 'Foto Produk Terbaik',
    description: 'Ambil foto produk yang paling laris. TLATEN akan bantu buat postingan.',
    difficulty: 'mudah',
    xpReward: 75,
    status: 'pending',
    category: 'Pemasaran',
    autoGenerate: true,
  },
  {
    id: '3',
    title: 'Hitung Laba Rugi Minggu Ini',
    description: 'TLATEN akan tanya beberapa pertanyaan tentang pengeluaran dan pemasukan.',
    difficulty: 'sedang',
    xpReward: 100,
    status: 'in-review',
    category: 'Keuangan',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 150000,
    description: 'Jual nasi goreng 10 porsi',
    category: 'Penjualan',
    timestamp: '2025-12-01T10:30:00',
  },
  {
    id: '2',
    type: 'expense',
    amount: 50000,
    description: 'Beli ayam dan sayuran',
    category: 'Belanja',
    timestamp: '2025-12-01T08:00:00',
  },
  {
    id: '3',
    type: 'income',
    amount: 85000,
    description: 'Jual mie goreng 5 porsi, es teh 3 gelas',
    category: 'Penjualan',
    timestamp: '2025-12-01T12:15:00',
  },
  {
    id: '4',
    type: 'expense',
    amount: 20000,
    description: 'Gas LPG',
    category: 'Operasional',
    timestamp: '2025-12-01T07:30:00',
  },
  {
    id: '5',
    type: 'income',
    amount: 120000,
    description: 'Jual soto ayam 8 porsi',
    category: 'Penjualan',
    timestamp: '2025-11-30T11:00:00',
  },
];

export const calculateFinanceSummary = (transactions: Transaction[]): FinanceSummary => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpense,
    profit: totalIncome - totalExpense,
  };
};
