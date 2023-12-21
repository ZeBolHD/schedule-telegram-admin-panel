import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";

import { sendNews } from "@/actions/sendNews";

import { News } from "@/types";

const NewsCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<News>({ mode: "onBlur", defaultValues: {} });

  const onSubmit: SubmitHandler<News> = async (data) => {
    setIsLoading(true);

    const res = await sendNews(data);

    setIsLoading(false);

    if (res) {
      toast.success("News sent successfully");
      reset();
      return;
    }

    toast.error("Something went wrong");
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl">News</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="heading" className="mb-1">
              Heading
            </Label>
            <Input
              {...register("heading", { required: "This field is required" })}
              className="w-full mt-2"
              placeholder="Heading"
            />
            {errors.heading && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.heading.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <Label>Images</Label>
            <Input
              {...register("images")}
              type="file"
              className="w-full mt-2"
              multiple
              accept="image/*"
            />
          </div>

          <div className="mt-5">
            <Label htmlFor="content" className="mb-1">
              Content
            </Label>
            <Textarea
              {...register("content", { required: "This field is required" })}
              className="w-full mt-2"
              placeholder="Content"
            />
            {errors.content && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.content.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-5">
            {isLoading ? <LoadingSpinner size={20} /> : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
