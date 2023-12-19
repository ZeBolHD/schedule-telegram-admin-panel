import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import NewsCard from "./NewsCard";
import AnnouncementCard from "./AnnouncementCard";

const NotificationCard = () => {
  return (
    <Tabs defaultValue="news">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="news">News</TabsTrigger>
        <TabsTrigger value="announcements">Announcements</TabsTrigger>
      </TabsList>
      <TabsContent value="news">
        <NewsCard />
      </TabsContent>
      <TabsContent value="announcements">
        <AnnouncementCard />
      </TabsContent>
    </Tabs>
  );
};

export default NotificationCard;
