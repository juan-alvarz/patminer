import { useState, useEffect } from "react";
import { styled } from "@mui/material";
import gsap from "gsap";
import TextPlugin from "gsap/dist/TextPlugin";
gsap.registerPlugin(TextPlugin);

const repeatDelay = 1;
const durationAnimate = 2;
const changeText = (repeatDelay + durationAnimate) * 1000; //3 * 1000

const P = styled("p")(({ theme }) => ({
  position: "absolute",
  marginTop: "2vw",
  color: "#D0402B",
  fontSize: "3rem",
  fontWeight: 700,
  [theme.breakpoints.down('md')]: {
    fontSize: "2.5rem",
    textAlign: 'center',
    margin: 'auto',
    marginTop: '10rem'
  },
  "@media (max-width:1025px)": {

  },
}));

const texts = [
  "Hard to Find Electronic Components",
  "Obsolete Electronic Components",
  "25+ Years of Experience",
  "We Buy Surplus",
  "Quality Guaranteed",
];

export default function TypingAnimation({ arrayText = texts }) {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    texts.forEach((text) => {
      tl.to("#textDescription-electronics", {
        duration: durationAnimate,
        text: text,
        repeat: 1,
        repeatDelay: 1,
        delay: 0.5,
        yoyo: true,
      });
    });
  }, []);

  return (
    <>
      <P id="textDescription-electronics"></P>
    </>
  );
}
