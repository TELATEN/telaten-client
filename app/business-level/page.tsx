"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useGetBusinessLevels,
  useDeleteBusinessLevel,
} from "@/hooks/services/business-level";
import BusinessLevelDialog from "@/components/business-level/BusinessLevelDialog";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function BusinessLevelPage() {
  const { data: levels, isLoading } = useGetBusinessLevels();
  const deleteMutation = useDeleteBusinessLevel();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Berhasil",
        description: "Level bisnis berhasil dihapus.",
      });

      await queryClient.refetchQueries({ queryKey: ["get-business-levels"] });
    } catch {
      toast({
        title: "Gagal",
        description: "Gagal menghapus level bisnis.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Level Bisnis
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Kelola level bisnis untuk pengguna yang mendaftar
                </p>
              </div>
            </div>
          </div>
          <BusinessLevelDialog isEdit={false} callback={() => {}}>
            <Button type="button" className="flex gap-2">
              + Tambah Level
            </Button>
          </BusinessLevelDialog>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse h-56 bg-muted" />
            ))}
          </div>
        ) : levels && levels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {levels.map((level) => (
              <Card
                key={level.id}
                className="flex flex-col items-center p-6 bg-card border border-border"
              >
                <div className="w-16 h-16 text-3xl flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
                  {level.icon}
                </div>
                <div className="text-lg font-semibold mb-1 text-center">
                  {level.name}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  Poin dibutuhkan:{" "}
                  <span className="font-bold">{level.required_points}</span>
                </div>
                <div className="flex mt-3">
                  <BusinessLevelDialog
                    isEdit={true}
                    businessLevel={level}
                    callback={() => {}}
                  >
                    <Button size="sm" variant="ghost">
                      <Edit className="h-5 w-5"></Edit>
                    </Button>
                  </BusinessLevelDialog>
                  <ConfirmDialog
                    title="Hapus Level Bisnis"
                    description={`Yakin ingin menghapus level bisnis '${level.name}'?`}
                    onConfirm={() => handleDelete(level.id)}
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                    >
                      <Trash className="h-5 w-5"></Trash>
                    </Button>
                  </ConfirmDialog>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Belum ada level bisnis.
          </div>
        )}
      </div>
    </div>
  );
}
