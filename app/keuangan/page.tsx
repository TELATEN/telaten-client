"use client";

import { useState } from "react";
import {
  Wallet,
  Loader2,
  Plus,
  List,
  AlertCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CreateTransactionForm } from "@/components/finance/CreateTransactionForm";
import { TransactionList } from "@/components/finance/TransactionList";
import { FinancialSummaryCard } from "@/components/finance/FinancialSummaryCard";
import { TransactionFilter } from "@/components/finance/TransactionFilter";
import { SummaryPeriodFilter } from "@/components/finance/SummaryPeriodFilter";
import { CategoryManager } from "@/components/finance/CategoryManager";
import CelebrationModal from "@/components/CelebrationModal";
import useTransactions from "@/hooks/services/finance/use-transactions";
import useFinancialSummary from "@/hooks/services/finance/use-financial-summary";
import useCreateTransaction from "@/hooks/services/finance/use-create-transaction";
import useDeleteTransaction from "@/hooks/services/finance/use-delete-transaction";
import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import type { CreateTransactionInput } from "@/types/entity/finance";

interface CelebrationData {
  type: "task" | "milestone" | "achievement";
  title: string;
  points: number;
  level?: string;
  message?: string;
}

export default function KeuanganPage() {
  const { toast } = useToast();
  const [filterParams, setFilterParams] = useState<{
    start_date?: string;
    end_date?: string;
    page?: number;
    size?: number;
  }>({
    page: 1,
    size: 20,
  });
  const [summaryPeriod, setSummaryPeriod] = useState<
    "day" | "week" | "month" | "year"
  >("month");
  const [celebrationData, setCelebrationData] =
    useState<CelebrationData | null>(null);

  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    error: transactionsError,
  } = useTransactions(filterParams);
  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: summaryError,
  } = useFinancialSummary({ period: summaryPeriod });
  const { data: businessData } = useBusinessProfile();
  const createTransaction = useCreateTransaction();
  const deleteTransaction = useDeleteTransaction();

  const handleCreateTransaction = (data: CreateTransactionInput) => {
    createTransaction.mutate(data, {
      onSuccess: (response: any) => {
        toast({
          title: "Transaksi Berhasil Disimpan!",
          description: `${data.type === "income" ? "Pemasukan" : "Pengeluaran"} sebesar Rp ${data.amount.toLocaleString("id-ID")} telah dicatat.`,
        });

        // Check if achievement was unlocked
        if (response.unlocked_achievement) {
          setTimeout(() => {
            setCelebrationData({
              type: "achievement",
              title: response.unlocked_achievement.title,
              points: response.unlocked_achievement.required_points,
              level: businessData?.level_name,
              message: `${response.unlocked_achievement.badge_icon} ${response.unlocked_achievement.description}`,
            });
          }, 500);
        }
      },
      onError: (error: any) => {
        toast({
          title: "Gagal Menyimpan Transaksi",
          description: error?.response?.data?.message || "Terjadi kesalahan",
          variant: "destructive",
        });
      },
    });
  };

  const handleTransactionFilterChange = (
    startDate?: string,
    endDate?: string
  ) => {
    if (startDate && endDate) {
      setFilterParams({
        start_date: startDate,
        end_date: endDate,
        page: 1,
        size: 20,
      });
    } else {
      setFilterParams({ page: 1, size: 20 });
    }
  };

  const handleSummaryPeriodChange = (period: "day" | "week" | "month" | "year") => {
    setSummaryPeriod(period);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    deleteTransaction.mutate(transactionId, {
      onSuccess: () => {
        toast({
          title: "Transaksi Berhasil Dihapus!",
          description: "Transaksi telah dihapus dari sistem.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Gagal Menghapus Transaksi",
          description: error?.response?.data?.message || "Terjadi kesalahan",
          variant: "destructive",
        });
      },
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilterParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      <CelebrationModal
        isOpen={!!celebrationData}
        onClose={() => setCelebrationData(null)}
        type={celebrationData?.type || "achievement"}
        title={celebrationData?.title || ""}
        points={celebrationData?.points || 0}
        level={celebrationData?.level}
        message={celebrationData?.message}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Keuangan
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Kelola transaksi bisnis Anda
                </p>
              </div>
            </div>

            {/* Financial Summary */}
            {isLoadingSummary ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
                <span className="ml-2 text-sm text-gray-500">
                  Memuat ringkasan keuangan...
                </span>
              </div>
            ) : summaryError ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                      Gagal memuat ringkasan keuangan
                    </p>
                    {summaryError instanceof Error && (
                      <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                        Error: {summaryError.message}
                      </p>
                    )}
                    <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                      Pastikan backend API sudah running dan endpoint
                      /finance/summary tersedia.
                    </p>
                  </div>
                </div>
              </div>
            ) : summary ? (
              <FinancialSummaryCard summary={summary} />
            ) : (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Belum ada data ringkasan keuangan.
                  </p>
                </div>
              </div>
            )}
          </header>

          {/* Tabs */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Transaksi
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tambah
              </TabsTrigger>
              <TabsTrigger value="category" className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4" />
                Kategori
              </TabsTrigger>
            </TabsList>

            {/* Transaction List Tab */}
            <TabsContent value="list" className="space-y-4">
              {/* Filters */}
              <div className="grid gap-4 md:grid-cols-2">
                <SummaryPeriodFilter 
                  period={summaryPeriod}
                  onPeriodChange={handleSummaryPeriodChange}
                />
                <TransactionFilter onFilterChange={handleTransactionFilterChange} />
              </div>

              {/* Transaction List */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Riwayat Transaksi
                </h2>
                {isLoadingTransactions ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    <span className="ml-2 text-sm text-gray-500">
                      Memuat transaksi...
                    </span>
                  </div>
                ) : transactionsError ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                          Gagal memuat daftar transaksi
                        </p>
                        {transactionsError instanceof Error && (
                          <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                            Error: {transactionsError.message}
                          </p>
                        )}
                        <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                          Pastikan backend API sudah running dan endpoint
                          /finance/transactions tersedia.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : transactionsData && transactionsData.items.length > 0 ? (
                  <>
                    <TransactionList
                      transactions={transactionsData.items}
                      onDelete={handleDeleteTransaction}
                      isDeleting={deleteTransaction.isPending}
                    />

                    {/* Pagination */}
                    {transactionsData.pages > 1 && (
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Halaman {transactionsData.page} dari{" "}
                          {transactionsData.pages}
                          <span className="ml-2">
                            ({transactionsData.total} transaksi)
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handlePageChange(transactionsData.page - 1)
                            }
                            disabled={transactionsData.page === 1}
                          >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Sebelumnya
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handlePageChange(transactionsData.page + 1)
                            }
                            disabled={
                              transactionsData.page >= transactionsData.pages
                            }
                          >
                            Selanjutnya
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Belum ada data transaksi.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Create Transaction Tab */}
            <TabsContent value="create">
              <CreateTransactionForm
                onSubmit={handleCreateTransaction}
                isLoading={createTransaction.isPending}
              />
            </TabsContent>

            {/* Category Management Tab */}
            <TabsContent value="category">
              <CategoryManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
