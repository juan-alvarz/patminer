import React from "react";
import phoneImg from '../../../assets/footer/phone.svg';
import mailImg from '../../../assets/footer/mail.svg';
import facebookImg from '../../../assets/footer/facebook.svg';
import linkedinImg from '../../../assets/footer/linkedIn.svg';
import logoImg from '../../../assets/footer/logo-footer.svg';
import { Box, styled } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import FooterBanner from "../../../components/Banner/FooterBanner";

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#040627",
    color: "white",
}));

const FooterContent = styled(Box)(({ theme }) => ({
    paddingTop: "4rem",
    width: "80%",
    margin: "auto",
}));

const InputContainer = styled(Box)(({ theme }) => ({
    fontWeight: 400,
    fontSize: "1.25rem",
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
    height: "3rem",
    "@media (max-width:1600px)": {
        // border: '1px solid red'
    },
}));

const InputPart = styled("input")(({ theme }) => ({
    color: "black",
    border: 'none',
    borderRadius: "8px",
    width: "100%",
    padding: '2rem',
    paddingLeft: "1rem",
    height: "3rem",
    "@media(max-width:1025px)": {
        fontSize: "1.4rem",
        height: "4rem",
        paddingLeft: "2rem",
    },
}));

const ButtonSearch = styled("button")(({ theme }) => ({
    border: 'none',
    outline: 'none',
    backgroundColor: "#D0402B",
    color: "white",
    width: "20%",
    textAlign: "center",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    padding: '2rem',
    borderRadius: "8px",
    transition: '.3s all',
    '&:hover': {
        cursor: 'pointer',
        color: '#D0402B',
        backgroundColor: 'white',
    },
    "@media (max-width:1025px)": {
        height: "4rem",
        fontSize: "1.4rem",
        width: "47%",
        margin: "auto",
    },
}));

const FooterInputSearchP = styled("p")(({ theme }) => ({
    fontWeight: 700,
    fontSize: "1.5rem",
    marginTop: "1.5rem",
    "@media(max-width:1025px)": {
        fontSize: "1.5rem",
        textAlign: "center",
    },
}));

const YourFeedbackP = styled("p")({
    fontWeight: 600,
    fontSize: "1.3rem",
    marginBottom: "1rem",
    "@media (max-width:1025px)": {
        fontSize: "1.5rem",
    },
});

const ContactInformationP = styled("p")(({ theme }) => ({
    fontWeight: 400,
    fontSize: "1.3rem",
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    "@media (max-width:1025px)": {
        fontSize: "1.25rem",
        textAlign: "center",
    },
}));

const CopyrightP = styled("p")({
    fontWeight: 400,
    fontSize: "1.3rem",
    color: "#B4B4BE",
    "@media (max-width:1025px)": {
        fontSize: "1.25rem",
    },
});

const IconContainer = styled("img")(({ theme }) => ({
    width: "2.5rem",
    marginRight: "2rem",
}));

const LinksFooter = styled("a")({
    fontWeight: 700,
    fontSize: "1.3rem",
    "@media (max-width:1025px)": {
        fontSize: "1.75rem",
        padding: ".5rem",
    },
    "&:hover": {
        cursor: "pointer",
    },
});

function FooterMobile() {
    const FooterContainer = styled("footer")({
        backgroundColor: "#040627",
        color: "white",
        fontFamily: "Inter",
    });
    const MainContainer = styled(Box)({
        width: "90%",
        margin: "auto",
        paddingTop: "5rem",
    });
    const ButtonsContainer = styled(Box)({
        display: "flex",
        justifyContent: "space-between",
        marginTop: "2rem",
    });
    return (
        <>
            <FooterBanner />
            <FooterContainer>
                <MainContainer>
                    <Box>
                        <Box>
                            <FooterInputSearchP>
                                Search by Electronic Part Number
                            </FooterInputSearchP>
                            <InputPart
                                type="text"
                                placeholder="Search part..."
                                className="shadow-inner shadow-gray-600 focus:ring focus:ring-[#D0402B]"
                            />
                        </Box>
                        <ButtonsContainer>
                            <ButtonSearch>Search</ButtonSearch>
                            <ButtonSearch>Contact Us</ButtonSearch>
                        </ButtonsContainer>
                    </Box>

                    <Box style={{ textAlign: "center", marginTop: "2rem" }}>
                        <YourFeedbackP>Your feedback is appreciated</YourFeedbackP>
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <ContactInformationP>
                                <IconContainer src={phoneImg} alt="phone" /> +1
                                (603) 218-3767
                            </ContactInformationP>
                            <ContactInformationP>
                                <IconContainer src={mailImg} alt="mail" />{" "}
                                COMMENTS@PART-MINER.COM
                            </ContactInformationP>
                        </Box>
                    </Box>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            style={{
                                display: "flex",
                                alignItems: "center",
                                position: "relative",
                                marginTop: "3rem",
                            }}
                        >
                            <a
                                title="facebook"
                                href="https://www.facebook.com/PartminerIndustries"
                                style={{ marginRight: "3rem", transform: "scale(1.5)" }}
                            >
                                <img src={facebookImg} alt="facebook" />
                            </a>
                            <a
                                href="https://www.linkedin.com/" title='linkedin'
                                style={{ transform: "scale(1.5)" }}>
                                <img src={linkedinImg} alt="linkedIn" />
                            </a>
                        </Box>
                        <Box style={{ marginTop: "2rem" }}>
                            <img src={logoImg} alt="logo-footer" />
                        </Box>
                    </Box>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderTop: "1px solid #363852",
                            padding: "2rem",
                            marginTop: "3rem",
                        }}
                    >
                        <LinksFooter href="/about">ABOUT US</LinksFooter>
                        <LinksFooter href="https://www.part-miner.com/web/fsg/1">
                            LINE CARD
                        </LinksFooter>
                        <LinksFooter href="/contact">CONTACT US</LinksFooter>
                        <LinksFooter href="https://www.part-miner.com/web/terms">
                            TERMS AND CONDITIONS
                        </LinksFooter>
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                        <CopyrightP>
                            Copyright © 2022 PartMiner Industries. All Rights Reserved.
                        </CopyrightP>
                    </Box>
                </MainContainer>
            </FooterContainer>
        </>
    );
}

function FooterDesktop() {
    return (
        <>
            <FooterBanner />
            <FooterContainer>
                <FooterContent>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <InputContainer>
                            <Box style={{ width: "70%" }}>
                                <InputPart
                                    type="text"
                                    placeholder="Search part..."
                                    className="shadow-inner shadow-gray-600 focus:ring focus:ring-[#D0402B]"
                                />
                            </Box>
                            <ButtonSearch>SEARCH</ButtonSearch>
                        </InputContainer>
                        <Box style={{ position: "relative", right: "3vw" }}>
                            <ButtonSearch style={{ width: '15rem', padding: '1rem' }}>
                                CONTACT US
                            </ButtonSearch>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <FooterInputSearchP>
                            Search by Electronic Part Number
                        </FooterInputSearchP>
                        <Box style={{ marginTop: "2rem" }}>
                            <YourFeedbackP>Your feedback is appreciated</YourFeedbackP>
                            <ContactInformationP>
                                <IconContainer src={phoneImg} alt="phone" /> +1
                                (603) 218-3767
                            </ContactInformationP>
                            <ContactInformationP>
                                <IconContainer src={mailImg} alt="mail" />{" "}
                                COMMENTS@PART-MINER.COM
                            </ContactInformationP>
                        </Box>
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                            <Link to="/web/">
                                <img src={logoImg} alt="logo-footer" />
                            </Link>
                        </Box>
                        <Box
                            style={{
                                display: "flex",
                                alignItems: "center",
                                position: "relative",
                                marginTop: "3rem",
                            }}
                        >
                            <a title="facebook" href="https://www.facebook.com/PartminerIndustries" style={{ marginRight: "1rem" }}>
                                <img src={facebookImg} alt="facebook" />
                            </a>
                            <a href="https://www.linkedin.com/" title='linkedin'>
                                <img src={linkedinImg} alt="linkedIn" />
                            </a>
                        </Box>
                    </Box>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: "1px solid #363852",
                            padding: "2rem 0rem 7rem",
                            marginTop: "2rem",
                        }}
                    >
                        <Box
                            style={{
                                width: "50%",
                                justifyContent: "space-between",
                                display: "flex",
                            }}
                        >
                            <LinksFooter href="/about">ABOUT US</LinksFooter>
                            <LinksFooter href="/web/fsg/1">
                                LINE CARD
                            </LinksFooter>
                            <LinksFooter href="/contact">CONTACT US</LinksFooter>
                            <LinksFooter href="/web/terms">
                                TERMS AND CONDITIONS
                            </LinksFooter>
                        </Box>
                        <Box>
                            <CopyrightP>
                                Copyright © 2022 PartMiner Industries. All Rights Reserved.
                            </CopyrightP>
                        </Box>
                    </Box>
                </FooterContent>
            </FooterContainer>
        </>
    );
}

export default function AltFooter() {
    const matches = useMediaQuery("(max-width:1024px)");
    return <>{matches ? <FooterMobile /> : <FooterDesktop />}</>;
}


// import React from 'react'
// import './../home.css';
// import "./../../../assets/plugins/landing.min.css";
// import { Link } from "react-router-dom";
// import facebook from "./../../../assets/home/footer/facebook.png";
// import twitter from "./../../../assets/home/footer/twitter.png";
// import linkedin from "./../../../assets/home/footer/linkedin.png";
// import instagram from "./../../../assets/home/footer/instagram.png";
// import footer_logo from "./../../../assets/img/logo.png";

// const Footer = () => (
//     <footer className="footer purchase-section text-center float-bg" id="footer" style={{}}>
//         <div className="header header-transparent header-transparent2">
//             <div className="header-middle sticky-header fix-top sticky-content has-center header-middle2">
//                 <br /><br /><br /><br /><br />
//                 <div className="container-fluid">
//                     <div className="header-left">
//                         <Link to="/web/">
//                             <img style={{ width: '210px', marginInline: '40px' }} src={footer_logo} alt="logo" width={153} height={44} />
//                         </Link>
//                     </div>
//                     <div className="header-center">
//                         <nav className="main-nav d-lg-block">
//                             <ul className="menu menu-active-underline">
//                                 <li>
//                                     <Link to="/web/"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>HOME</h1></Link>
//                                 </li>
//                                 <li>
//                                     <Link to="/web/rfq"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>RFQ</h1></Link>
//                                 </li>
//                                 <li>
//                                     <Link to="/web/nsns"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>NSNS</h1></Link>
//                                 </li>
//                                 <li>
//                                     <Link to="/web/fsg/1"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>FSC LINE CARD</h1></Link>
//                                 </li>
//                                 <li className="d-xl-show submenu-container">
//                                     <Link to="/web/contactUs"> <a rel="noopener" className="btn btn-rounded btn-solid gra-reversed btn-purchase" style={{ border: '0px', fontWeight: 'bold' }}>CONTACT US</a></Link>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="header header-transparent header-transparent2">
//             <div className="header-middle sticky-header fix-top sticky-content has-center header-middle2" style={{ paddingTop: '0px' }}>
//                 <div className="container-fluid">
//                     <div className="header-left">
//                         <p className="w-100 mb-0 header-leftTextChange">
//                             Copyright © 2022 PartMiner Industries. All Rights Reserved.
//                             <br />
//                             <ul className="menu menu-active-underline">
//                                 <li>
//                                     <Link to="/web/terms" style={{ height: '20px !important' }} ><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold', fontSize: 12, cursor: 'pointer' }}>Terms and Conditions</h1></Link>
//                                 </li>
//                             </ul>
//                         </p>
//                     </div>
//                     <div className="header-center">
//                         <nav className="main-nav d-lg-block">
//                             <ul className="menu menu-active-underline">
//                                 <li>
//                                     <span style={{ fontSize: "16px", marginTop: "-4px" }}>Your feedback is appreciated </span>
//                                 </li>
//                                 <li>
//                                     <a className='aStyle2' href="tel:+1(603) 218-3767">+1(603) 218-3767</a>
//                                 </li>
//                                 <li>
//                                     <a className='aStyle2' href="mailto:comments@part-miner.com">comments@part-miner.com</a>
//                                 </li>
//                             </ul>
//                             <div className='redesSociales'>
//                                 <a href="https://www.facebook.com/PartminerIndustries" title='facebook'><img src={facebook} alt="" /></a>
//                                 {/* <a href="#"><img src={twitter} alt="" /></a> */}
//                                 <a href="https://www.linkedin.com/" title='linkedin'> <img src={linkedin} alt="" /></a>
//                                 {/* <a href="#"> <img src={instagram} alt="" /></a> */}
//                             </div>
//                         </nav>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </footer>
// )

// export default Footer