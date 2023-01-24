import { Box, styled } from '@mui/system';
import logo from '../../../assets/img/logo.png'

const Nav = styled('nav')(({ theme }) => ({
  width: '100%',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border:'1px solid red'
}))

const ImgContainer = styled('img')(({theme}) => ({
  height:'100%'
}))

export default function AltMenu() {
  return (
    <>
      <Nav>
        <Box>
          <ImgContainer src={logo} alt="logo" />
        </Box>
        <Box>
          <p>Links</p>
        </Box>
      </Nav>
    </>
  )
}