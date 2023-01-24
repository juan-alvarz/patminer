import { styled, Box } from '@mui/system';

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#D0402B',
  color: 'white',
  fontSize: '2rem',
  textAlign: 'center',
  padding: '3rem'
}))

const SpanContact = styled('span')(({ theme }) => ({
  textDecoration: 'underline'
}))


export default function FooterBanner() {
  return (
    <>
      <MainContainer>
        Didn’t find the part you’re looking for? <SpanContact>Contact us</SpanContact> and we can help you find it.
      </MainContainer>
    </>

  )
}