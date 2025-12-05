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
import EmojiPickerComponent from "@/components/ui/emoji-picker";
import { BusinessLevel } from "@/types";
import useCreateBusinessLevel from "@/hooks/services/business-level/use-create-business-level";
import useUpdateBusinessLevel from "@/hooks/services/business-level/use-update-business-level";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const businessLevelSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  required_points: z.string().min(1, "Poin wajib diisi"),
  icon: z.string().min(1, "Icon wajib dipilih"),
});

type BusinessLevelFormData = z.infer<typeof businessLevelSchema>;

interface BusinessLevelDialogProps {
  isEdit: boolean;
  businessLevel?: BusinessLevel | null;
  callback: (businessLevel: BusinessLevel) => void;
  children: React.ReactNode;
}

export default function BusinessLevelDialog({
  isEdit,
  businessLevel,
  callback,
  children,
}: BusinessLevelDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<BusinessLevelFormData>({
    resolver: zodResolver(businessLevelSchema),
    defaultValues: {
      name: "",
      required_points: "",
      icon: "",
    },
  });

  const [open, setOpen] = useState(false);

  const createMutation = useCreateBusinessLevel();
  const updateMutation = useUpdateBusinessLevel();

  useEffect(() => {
    if (isEdit && businessLevel) {
      form.reset({
        name: businessLevel.name,
        required_points: businessLevel.required_points.toString(),
        icon: businessLevel.icon,
      });
    } else {
      form.reset({
        name: "",
        required_points: "",
        icon: "",
      });
    }
  }, [isEdit, businessLevel, form]);

  const onSubmit = async (data: BusinessLevelFormData) => {
    try {
      if (isEdit && businessLevel) {
        const result = await updateMutation.mutateAsync({
          ...data,
          required_points: Number(data.required_points),
          id: businessLevel.id,
        });
        callback(result);
        toast({
          title: "Berhasil",
          description: "Level bisnis berhasil diperbarui.",
        });
      } else {
        const result = await createMutation.mutateAsync({
          ...data,
          required_points: Number(data.required_points),
        });
        callback(result);
        toast({
          title: "Berhasil",
          description: "Level bisnis berhasil dibuat.",
        });
      }
      form.reset();
      setOpen(false);

      queryClient.invalidateQueries({ queryKey: ["get-business-levels"] });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menyimpan level bisnis.",
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
            {isEdit ? "Edit Level Bisnis" : "Buat Level Bisnis Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui detail level bisnis."
              : "Buat level bisnis baru untuk pengguna."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Level
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Contoh: Silver, Gold, Platinum"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 mt-2">
                    {form.formState.errors.name.message}
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
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <div className="col-span-3">
                <EmojiPickerComponent
                  emoji={form.watch("icon")}
                  onEmojiChange={(val) => form.setValue("icon", val)}
                />
                {form.formState.errors.icon && (
                  <p className="text-sm text-red-500 mt-2">
                    {form.formState.errors.icon.message}
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
