import React from "react";

import FooterBanner from "./../../components/Banner/FooterBanner";
import AltFooter from "./../../components/home/footer/footer";
import Delivering from "./../../components/AboutUs/DeliveringText";
import AboutContent from "./../../components/AboutUs/AboutUsContent";
import { Box } from "@mui/system";
import Menu from "components/home/menu/menu";

export default function AboutUs() {
  return (
    <>
      <div className="menuColor1">
        <Menu />
      </div>
      <div>
        <Delivering />
        <AboutContent />
      </div>
      <div>
        <FooterBanner />
        <AltFooter />
      </div>
    </>
  );
}

{/* <Box style={{ backgroundColor: "#040627" }}>
  <Box style={{ paddingBottom: "4vw" }}>
    <Delivering />
    <AboutContent />
  </Box>
  <FooterBanner />
  <AltFooter />
</Box> */}