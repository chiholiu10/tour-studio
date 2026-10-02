import Studio from "@/features/tour-studio/studio";
import { studioCapabilities } from "@/features/tour-studio/server/provider-config";

export const dynamic = "force-dynamic";

export default function Home() {
  return <Studio capabilities={studioCapabilities()} />;
}
