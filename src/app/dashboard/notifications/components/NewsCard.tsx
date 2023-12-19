import { SubmitHandler, useForm } from "react-hook-form";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface NewsForm {
  heading: string;
  content: string;
}

const NewsCard = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewsForm>({ mode: "onBlur", defaultValues: {} });

  const onSubmit: SubmitHandler<NewsForm> = (data) => {
    const { heading, content } = data;
    console.log(heading, content);
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
          <div className="w-full flex justify-end">
            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
