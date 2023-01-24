import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import stars from '../../assets/about/vectors/stars.svg'
import circuit from '../../assets/about/vectors/circuit.svg'
import world from '../../assets/about/vectors/world.svg'
import trophy from '../../assets/about/vectors/trophy.svg'
import cash from '../../assets/about/vectors/cash.svg'
import money from '../../assets/about/vectors/money.svg'
import secretary from '../../assets/about/secretary.png'
import wiring from '../../assets/about/wiring.png'



const MainContainer = styled(Box)(({ theme }) => ({
  color: "white",
  backgroundColor: "#040627",
  padding: "0 5rem",
}));

const H1 = styled("h1")(({ theme }) => ({
  fontWeight: 700,
  fontSize: "5rem",
  color:'white',
  lineHeight: 1.8,
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.1,
    fontSize: "3rem",
  },
}));

const P = styled("p")(({ theme }) => ({
  fontWeight: 400,
  fontSize: "1.8rem",
  lineHeight: 1.2,
  padding: ".5rem 0",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const IMGContainer = ({ img }) => {
  const Container = styled("img")(({ theme }) => ({
    width: "20vw",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));
  return <Container src={img} alt={`${img}-image`} />;
};

const VectorAndText = ({ img, text }) => {
  const IMGVectorContainer = styled("img")(({ theme }) => ({
    width: "5vw",
  }));
  return (
    <Box
      style={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IMGVectorContainer
        src={img}
        alt={`${img}-image`}
      />
      <P style={{ textAlign: "center", width: "90%" }}>{text}</P>
    </Box>
  );
};

export default function AboutContent() {
  return (
    <>
      <MainContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} md={9}>
            <Box style={{ marginBottom: "3rem" }}>
              <H1>About PartMiner</H1>
              <P>
                As a global marketplace for Hard-to-Find and obsolete electronic
                components, PartMiner Industries is an efficient,
                customer-oriented company with over 25 years’ experience solving
                our client's supply problems.
              </P>
              <P>
                Whether it's urgent same day delivery for Assembly Lines Down or
                AOG, to long term planning to avoid critical component shortages
                or for fixed cost savings, our clients look at us as an
                extension to their purchasing team.
              </P>
            </Box>
            <Box>
              <H1>Why Customers Choose Us</H1>
              <P>
                In a world experiencing extreme shortages... Our clients come to
                us with confidence knowing that our factory direct contacts
                built over decades that we can deliver the right parts at the
                best reasonable prices.
              </P>
            </Box>
            <Grid container style={{ padding: "3w 0", margin: "3vw 0" }}>
              <Grid item xs={12}>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2vw",
                  }}
                >
                  <VectorAndText
                    img={stars}
                    text="Source from pre-qualified vendors only"
                  />
                  <VectorAndText img={money} text="Competitive pricing" />
                  <VectorAndText
                    img={circuit}
                    text="Stock or locate any electronic component"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <VectorAndText
                    img={world}
                    text="Free part search of our global database"
                  />
                  <VectorAndText
                    img={trophy}
                    text="We are very competitive"
                  />
                  <VectorAndText
                    img={cash}
                    text="We pay cash for excess inventory"
                  />
                </Box>
              </Grid>
            </Grid>
            <Box>
              <H1>What Sets Us Apart</H1>
              <P>
                Our database consists of active, passive, electromechanical, and
                other components that mount onto printed circuit boards (board
                level electronic components).
              </P>
              <P>
                Including integrated circuits (ICs), semiconductors, diodes,
                transistors, memory chips and modules, microprocessors,
                capacitors, resistors, switches, relays, connectors, and much
                more!
              </P>
            </Box>
          </Grid>

          {/* IMAGES */}
          <Grid item xs={0} md={3}>
            <Box style={{ marginBottom: "5vw" }}>
              <IMGContainer img={wiring} />
            </Box>
            <IMGContainer img={secretary} />
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}
