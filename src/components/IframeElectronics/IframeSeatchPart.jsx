import { useEffect, useState } from "react";
//import { QueryStringPart, getWebLink } from "../components/search";
import { getWebLink } from "./script.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Box, styled } from "@mui/system";
gsap.registerPlugin(ScrollTrigger)


const scrollToIframe = () => {
  gsap.to(window, {
    scrollTo: '#iframe-searchpart',
    duration: 1,
    delay: 1
  })
}

const IFrameContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  height: '50rem',
}))

export default function IframeSearchPart({ queryAux = 'led' }) {
  const [loadPage, setLoadPage] = useState(false);
  // const [searchPart, setSearchPart] = useState("");
  useEffect(() => {
    typeof window !== "undefined" ? setLoadPage(true) : setLoadPage(false);
    if (loadPage) {
      getWebLink(queryAux);
    }
    scrollToIframe();
  }, [loadPage, queryAux]);

  return (
    <>
      <IFrameContainer>
        <iframe
          id="iFrame"
          width="100%"
          height="100%"
          allow="fullscreen"
          className="fcc"
        />
      </IFrameContainer>
    </>
  )

}