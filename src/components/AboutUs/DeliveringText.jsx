import { styled } from "@mui/material";
import { Box } from "@mui/system";
import gsap from "gsap";
import { useEffect } from "react";

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#040627",
  marginTop: '-3rem',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50vw",
}));

const H1 = styled("h1")(({ theme }) => ({
  fontSize: "6rem",
  color: "white",
  fontWeight: 700,
  textAlign: "center",
  lineHeight: 1.5,
  [theme.breakpoints.down("md")]: {
    fontSize: "4em",
  },
}));

const Span = styled("span")(({ theme }) => ({
  position: "relative",
  color: "white",
  fontWeight: 700,
  textAlign: "center",
  lineHeight: 1.5,
  zIndex: "1",
}));

const RightPartsBorder = () => {
  const Border = styled("div")(({ theme }) => ({
    position: "absolute",
    width: "30rem",
    // width: "21rem",
    height: "5rem",
    backgroundColor: "rgba(208, 64, 43, 0.63)",
    transformOrigin: "left",
    marginLeft: "37rem",
    marginTop: "-5rem",
    [theme.breakpoints.down("laptop")]: {
      width: "15rem",
      marginLeft: "19rem",
    },
  }));

  return (
    <>
      <Border id="about-border-right-parts" />
    </>
  );
};

const BestPricesBorder = () => {
  const Border = styled("div")(({ theme }) => ({
    position: "absolute",
    width: "25rem",
    // width: "21rem",
    height: "5rem",
    backgroundColor: "rgba(208, 64, 43, 0.63)",
    marginLeft: "19rem",
    marginTop: "12.5rem",
    [theme.breakpoints.down("laptop")]: {
      width: "15rem",
      marginTop: "7rem",
    },
  }));
  return (
    <>
      <Border id="about-border-best-prices" />
    </>
  );
};

export default function Delivering() {
  useEffect(() => {
    gsap.from(["#about-border-right-parts", "#about-border-best-prices"], {
      duration: 2,
      width: "0",
    });
  }, []);
  return (
    <>
      <>
        <MainContainer>
          <RightPartsBorder />
          <BestPricesBorder />
          <H1>
            Delivering the{' '}
            <Span>Right Parts</Span> <br /> at the <Span>Best Prices</Span>{" "}
          </H1>
        </MainContainer>
      </>
      <></>
    </>
  );
}
