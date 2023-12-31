"use client";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapters deleted successfully");
      router.refresh();
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
   if(isPublished){
    await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
    toast.success("Chapters unpublished successfully");
   }else{
    await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
    toast.success("Chapters published successfully");
   }
      router.refresh();
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        size="sm"
        variant="outline"
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isPublished ? "Un Publish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
