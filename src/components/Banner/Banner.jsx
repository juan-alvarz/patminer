import { styled, Box } from "@mui/material";
import image5 from '../../assets/Banner/image5.png';
import TypingAnimation from "./TypingAnimation";
import { CloudUpload } from "@material-ui/icons";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { useEffect, useState } from "react";
import IframeSearchPart from "components/IframeElectronics/IframeSeatchPart";
gsap.registerPlugin(ScrollToPlugin)




const H1 = styled("h1")(({ theme }) => ({
  color: "white",
  fontWeight: 700,
  fontSize: "10rem",
  lineHeight: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '6rem'
  }
}));


const AuxP = styled("p")(({ theme }) => ({
  color: "white",
  fontSize: "1.5rem",
  width: "70%",
  [theme.breakpoints.down('md')]: {
    fontSize: "1.8rem",
    width: "100%",
    textAlign: "center",
  }
}));

const InputContainer = styled(Box)(({ theme }) => ({
  marginTop: "10rem",
  fontWeight: 400,
  fontSize: "1.2rem",
  display: "flex",
  justifyContent: "space-between",
  height: "3rem",
  width: "50%",
  "@media (max-width:1600px)": {
    // border: '1px solid red'
  },
  "@media (max-width:1025px)": {
    height: "auto",
    width: "90%",
    margin: "auto",
    marginTop: "5rem",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1.5rem",
  },
}));

const InputPart = styled("input")(({ theme }) => ({
  border: 'none',
  borderRadius: "8px",
  width: "70%",
  fontSize: '2rem',
  padding: '2rem',
  paddingLeft: "2rem",
  "@media(max-width:1025px)": {
    width: "100%",
    height: "4rem",
  },
}));

const ButtonSearch = styled("button")(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  border: 'none',
  padding: '2rem',
  backgroundColor: "#D0402B",
  color: "white",
  width: "25%",
  fontSize: '2rem',
  borderRadius: "8px",
  transition: '.3s all',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#D0402B'
  },
  "@media(max-width:1024px)": {
    marginTop: "1rem",
    width: "50%",
    height: "4rem",
  },
}));


const ButtonUpload = styled(ButtonSearch)(({ theme }) => ({
  backgroundColor: "#ADACAC",
  // width: '30%',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  paddingTop: '20rem',
  paddingLeft: '10rem',
  width: '80%',
  [theme.breakpoints.down('md')]: {
    width: '95%',
    paddingLeft: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))



export default function Banner() {
  const MainContainer = styled(Box)(({ theme }) => ({
    zIndex: -1,
    marginTop: '-1rem',
    backgroundImage: `url(${image5})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('md')]: {
      backgroundColor: "#050728",
      backgroundPositionY: "4vh",
      minHeight: "100rem",
      backgroundRepeat: "no-repeat",
    }
  }))

  const [inputValue, setInputValue] = useState('')
  const [searchPart, setParSearch] = useState('')

  const handleInputChange = e => {
    e.preventDefault()
    setInputValue(e.target.value)
  }


  return (
    <>
      <MainContainer>
        <ContentContainer>
          <H1>ELECTRONICS</H1>
          <TypingAnimation />
          <br /><br /><br />
          <InputContainer>
            <InputPart
              placeholder="Search Electronic Component"
              value={inputValue}
              onChange={e => handleInputChange(e)}
              autoFocus={true}
            />
            <ButtonSearch
              onClick={e => setParSearch(inputValue)}
            >SEARCH</ButtonSearch>
          </InputContainer>
          <InputContainer>
            <AuxP>
              Know what you’re looking for? Upload a file with a list of the parts you’re searching and we will get back with a quote.
            </AuxP>
            <ButtonUpload>
              UPLOAD
              <CloudUpload style={{ fontSize: '2rem' }} />
            </ButtonUpload>
          </InputContainer>
        </ContentContainer>
      </MainContainer>
      <div id='iframe-searchpart'>
        <IframeSearchPart searchPart={searchPart} />
      </div>
    </>

  )
}
