"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Achievement } from "@/types";
import useCreateAchievement from "@/hooks/services/achievements/use-create-achievement";
import useUpdateAchievement from "@/hooks/services/achievements/use-update-achievement";
import { toast } from "@/hooks/use-toast";
import EmojiPickerComponent from "../ui/emoji-picker";

const achievementSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  required_points: z.string().min(1, "Poin wajib diisi"),
  badge_icon: z.string().min(1, "Icon wajib dipilih"),
});

type AchievementFormData = z.infer<typeof achievementSchema>;

interface AchievementDialogProps {
  isEdit: boolean;
  achievement?: Achievement | null;
  callback: (achievement: Achievement) => void;
  children: React.ReactNode;
}

export default function AchievementDialog({
  isEdit,
  achievement,
  callback,
  children,
}: AchievementDialogProps) {
  const form = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: "",
      description: "",
      required_points: "",
      badge_icon: "",
    },
  });

  const [open, setOpen] = useState(false);

  const createMutation = useCreateAchievement();
  const updateMutation = useUpdateAchievement();

  useEffect(() => {
    if (isEdit && achievement) {
      form.reset({
        title: achievement.title,
        description: achievement.description,
        required_points: achievement.required_points.toString(),
        badge_icon: achievement.badge_icon,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        required_points: "",
        badge_icon: "",
      });
    }
  }, [isEdit, achievement, form]);

  const onSubmit = async (data: AchievementFormData) => {
    try {
      if (isEdit && achievement) {
        const result = await updateMutation.mutateAsync({
          ...data,
          id: achievement.id,
        });
        callback(result);
        toast({
          title: "Berhasil",
          description: "Achievement berhasil diperbarui.",
        });
      } else {
        const result = await createMutation.mutateAsync(data);
        callback(result);
        toast({
          title: "Berhasil",
          description: "Achievement berhasil dibuat.",
        });
      }
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan achievement.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[605px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Achievement" : "Buat Achievement Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui detail achievement."
              : "Buat achievement baru untuk pengguna."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Judul Pencapaian
              </Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Contoh: Pebisnis handal"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500 mt-2">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Contoh: Mencapai 1000 poin dalam platform"
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500 mt-2">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="required_points" className="text-right">
                Poin yang dibutuhkan
              </Label>
              <div className="col-span-3">
                <Input
                  id="required_points"
                  type="number"
                  {...form.register("required_points")}
                  placeholder="Poin"
                />
                {form.formState.errors.required_points && (
                  <p className="text-sm text-red-500 mt-2">
                    {form.formState.errors.required_points.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="badge_icon" className="text-right">
                Icon
              </Label>
              <div className="col-span-3">
                <EmojiPickerComponent
                  emoji={form.watch("badge_icon")}
                  onEmojiChange={(val) => form.setValue("badge_icon", val)}
                />
                {form.formState.errors.badge_icon && (
                  <p className="text-sm text-red-500 mt-2">
                    {form.formState.errors.badge_icon.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Menyimpan..."
                : isEdit
                  ? "Update"
                  : "Buat"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
