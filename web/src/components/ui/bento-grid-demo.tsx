import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoCard } from "@/components/ui/bento-grid-utils/bento-card";
import {
  AiAssistantDemo,
  AnalyticsDemo,
  MusicPlayerDemo,
  NotificationsDemo,
  TerminalDemo,
  TeamMembersDemo,
  StorageDemo,
  ProgressDemo,
  CalendarDemo,
} from "@/components/ui/bento-grid-utils/demo-cards";
import {
  Bot,
  BarChart3,
  Music,
  BellRing,
  TerminalSquare,
  Users,
  Cloud,
  Globe,
  Calendar,
} from "lucide-react";

export default function BentoGridDemo() {
  return (
    <div className="w-full p-6 bg-black text-white">
      <BentoGrid>
        <BentoCard
          title="AI Assistant"
          description="Chat with an assistant that writes code for you."
          icon={<Bot className="h-5 w-5" />}
          colSpan={2}
        >
          <AiAssistantDemo />
        </BentoCard>

        <BentoCard
          title="Analytics"
          description="Track growth with real-time charts."
          icon={<BarChart3 className="h-5 w-5" />}
        >
          <AnalyticsDemo />
        </BentoCard>

        <BentoCard
          title="Music Player"
          description="Listen to your favorite tracks."
          icon={<Music className="h-5 w-5" />}
        >
          <MusicPlayerDemo />
        </BentoCard>

        <BentoCard
          title="Notifications"
          description="Stay on top of everything that matters."
          icon={<BellRing className="h-5 w-5" />}
        >
          <NotificationsDemo />
        </BentoCard>

        <BentoCard
          title="Terminal"
          description="Run builds and scripts from anywhere."
          icon={<TerminalSquare className="h-5 w-5" />}
          colSpan={2}
        >
          <TerminalDemo />
        </BentoCard>

        <BentoCard
          title="Team"
          description="Collaborate live with your teammates."
          icon={<Users className="h-5 w-5" />}
        >
          <TeamMembersDemo />
        </BentoCard>

        <BentoCard
          title="Storage"
          description="Sync files across every device."
          icon={<Cloud className="h-5 w-5" />}
        >
          <StorageDemo />
        </BentoCard>

        <BentoCard
          title="Global Network"
          description="Deployed on edge nodes worldwide."
          icon={<Globe className="h-5 w-5" />}
        >
          <ProgressDemo />
        </BentoCard>

        <BentoCard
          title="Calendar"
          description="Schedule and manage your events."
          icon={<Calendar className="h-5 w-5" />}
          colSpan={2}
        >
          <CalendarDemo />
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
