import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const NewsCard = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl">News</h3>
      </CardHeader>
      <CardContent>
        <p>News content</p>
        <div className="mt-5">
          <Label htmlFor="heading" className="mb-1">
            Title
          </Label>
          <Input id="heading" className="w-full mt-2" placeholder="Heading" />
        </div>
        <div className="mt-5">
          <Label htmlFor="content" className="mb-1">
            Content
          </Label>
          <Textarea
            id="content"
            className="w-full mt-2"
            placeholder="Content"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
