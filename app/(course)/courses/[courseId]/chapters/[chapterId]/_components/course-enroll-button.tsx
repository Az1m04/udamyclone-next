"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formate";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseId,
  price,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      router.push(response.data.url);
      console.log("response.data.url", response.data.url);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      size={"sm"}
      className="w-full md:w-auto"
      disabled={isLoading}
      onClick={onClick}
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};
