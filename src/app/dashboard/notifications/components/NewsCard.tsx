import { SubmitHandler, useForm } from "react-hook-form";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { News } from "@/types";
import { sendNews } from "@/actions/sendNews";

const NewsCard = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<News>({ mode: "onBlur", defaultValues: {} });

  const onSubmit: SubmitHandler<News> = async (data) => {
    await sendNews(data);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl">News</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>News content</h3>
          <div className="mt-5">
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

          <Button type="submit" className="w-full mt-5">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
