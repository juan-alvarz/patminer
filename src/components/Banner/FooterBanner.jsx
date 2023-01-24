import { styled, Box } from '@mui/system';
import { Link } from 'react-router-dom';

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#D0402B',
  color: 'white',
  fontSize: '2rem',
  textAlign: 'center',
  padding: '3rem'
}))

const SpanContact = styled('span')(({ theme }) => ({
  textDecoration: 'underline',
  transition: '.3s all',
  '&:hover': {
    fontWeight: 700,
    color: 'rgba(200,200,200)'
  }
}))

const ContacUsLink = styled(Link)(({ theme }) => ({
  textDecoration: 'underline !important'
}))


export default function FooterBanner() {
  return (
    <>
      <MainContainer>
        Didn’t find the part you’re looking for? <ContacUsLink to='/web/contactUs'>Contact us</ContacUsLink> and we can help you find it.
      </MainContainer>
    </>

  )
}