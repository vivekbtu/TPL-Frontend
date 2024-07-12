import { Box } from "@chakra-ui/react";
import DesktopNavbar from "../components/desktop/DesktopNavbar";
import DesktopHeader from "../components/desktop/DesktopHeader";
import DesktopProjectListing from "../components/desktop/DesktopProjectListing";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileNavbar from "../components/mobile/MobileNavbar";
import MobileProjectListing from "../components/mobile/MobileProjectListing";

export default function Projects() {
  return (
    <>
      {/* for desktop */}
      <Box
        display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
        bg="#eff3f6"
      >
        <DesktopNavbar />
        <Box w="95%" h="115vh" position={"relative"}>
          <DesktopHeader title={"Project Listing"} />
          <DesktopProjectListing />
        </Box>
      </Box>
      {/* for mobile */}
      <Box
        bg="#f0f3f6"
        display={{ base: "block", sm: "block", md: "none", lg: "none" }}
      >
        <MobileHeader title={"Project Listing"} />
        <MobileProjectListing />
        <MobileNavbar />
      </Box>
    </>
  );
}
