import { Box } from "@chakra-ui/react";
import DesktopNavbar from "../components/desktop/DesktopNavbar";
import DesktopHeader from "../components/desktop/DesktopHeader";
import DesktopOverviewSection from "../components/desktop/DesktopOverviewSection";
import DesktopGraph from "../components/desktop/DesktopGraph";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavbar from "../components/mobile/MobileNavbar";
import MobileOverview from "../components/mobile/MobileOverview";
import MobileGraph from "../components/mobile/MobileGraph";

export default function Home() {
  return (
    <>
      {/* for desktop */}
      <Box display={{ base: "none", sm: "none", md: "flex", lg: "flex" }} bg={"#eff3f6"}>
        <DesktopNavbar />
        <Box w="95%" h="100vh" position={"relative"} bg="#eff3f6">
          <DesktopHeader title={"Dashboard"} />
          <DesktopOverviewSection />
          <DesktopGraph />
        </Box>
      </Box>
      {/* for mobile */}
      <Box
        bg="#f0f3f6"
        display={{ base: "block", sm: "block", md: "none", lg: "none" }}
      >
        <MobileHeader title={"Dashboard"} />
        <MobileOverview />
        <MobileGraph />
        <MobileNavbar />
      </Box>
    </>
  );
}
