"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface EmojiPickerComponentProps {
  emoji: string;
  onEmojiChange: (emoji: string) => void;
}

export default function EmojiPickerComponent({
  emoji,
  onEmojiChange,
}: EmojiPickerComponentProps) {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiChange(emojiData.emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
          <span className="text-lg">{emoji ?? "👁️"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </PopoverContent>
    </Popover>
  );
}
