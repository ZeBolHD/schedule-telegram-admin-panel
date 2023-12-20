import { toast } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Announcement } from "@/types";
import sendAnnouncement from "@/actions/sendAnnouncement";

const AnnouncementCard = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Announcement>({ mode: "onBlur", defaultValues: {} });

  const onSubmit: SubmitHandler<Announcement> = async (data) => {
    try {
      await sendAnnouncement(data);
      toast.success("Announcement sent successfully");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl">Announcements</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Announcements content</h3>
          <div className="mt-5">
            <Label htmlFor="heading" className="mb-1">
              Heading
            </Label>
            <Input
              id="heading"
              {...register("heading", {
                required: "This field is required",
              })}
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
              id="content"
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

          <Button type="submit" className="mt-5 w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;