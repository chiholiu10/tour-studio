import TourStudio from "@/features/tour-studio/tour-studio";
import { tourStudioCapabilities } from "@/features/tour-studio/server/provider-config";

export const dynamic = "force-dynamic";

export default function Home() {
  return <TourStudio capabilities={tourStudioCapabilities()} />;
}
