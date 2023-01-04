import {Box, Container, Divider, Typography} from "@mui/material";
import ThemeContext from "../context/ThemeContext";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../utils/firebase-config";

const MainLayout = ({children}) => {
    const [checkbox, setCheckbox] = useState(false)
    const [user, loading, error] = useAuthState(auth);

    const theme = useContext(ThemeContext)

    return (
        <>
            <Box boxShadow={3}>
                <Container maxWidth={'xl'}>
                    <Box className={'burgerMenu'}>
                        <div className="menu-wrap">
                            <input type="checkbox" className="toggler" checked={checkbox}
                                   onClick={() => setCheckbox(!checkbox)}/>
                            <div className="hamburger">
                                <div></div>
                            </div>
                            <div className="menu">
                                <div>
                                    <div>
                                        <ul>
                                            <li>
                                                <a className="menu__link" href="">
                                                    <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}} onClick={() => setCheckbox(!checkbox)}>
                                                        Home
                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="menu__link" href="">
                                                    <Link to={'/studios'}
                                                          style={{textDecoration: 'none', color: 'inherit'}} onClick={() => setCheckbox(!checkbox)}>
                                                        Studios
                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="menu__link" href="">
                                                    <Link to={'/contact'}
                                                          style={{textDecoration: 'none', color: 'inherit'}} onClick={() => setCheckbox(!checkbox)}>
                                                        Contact
                                                    </Link>
                                                </a>
                                            </li>
                                            <Divider color={'white'}/>
                                            <li>
                                                <a className="menu__link" href="">
                                                    <Link to={'/admin'}
                                                          style={{textDecoration: 'none', color: 'inherit'}} onClick={() => setCheckbox(!checkbox)}>
                                                        Admin
                                                    </Link>
                                                </a>
                                            </li>
                                            {user &&
                                                <li onClick={() => {
                                                    logout()
                                                    setCheckbox(!checkbox)
                                                }}>

                                                    <a className="menu__link" href="">
                                                        Logout
                                                    </a>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} poisiton={'relative'}>
                        <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}}>

                            <Box display={'flex'} alignItems={'center'}>
                                <Box height={50} width={50} py={2}>
                                    <img alt={'Logo'} src={'/images/logo.png'} height={'100%'} width={'100%'}
                                         style={{objectFit: 'contain'}}/>
                                </Box>
                                <Typography fontWeight={200} fontSize={26} ml={2} mt={1}
                                            fontFamily={theme.secondaryFont}
                                            sx={{
                                                borderBottom: `16px ${theme.elevationColor} solid`, lineHeight: 0,
                                                width: 'fit-content'
                                            }}
                                >
                                    TattooSes
                                </Typography>
                            </Box>
                        </Link>
                        <Box className={'burgerMenuToggler'}>
                            <input type="checkbox" className="toggler" checked={checkbox}
                                   onClick={() => setCheckbox(!checkbox)}/>
                            <div className="hamburger">
                                <div></div>
                            </div>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box sx={{
                minHeight: '80vh',
                background: 'radial-gradient(circle, rgba(135,5,5,0.0970982142857143) 0%, rgba(220,220,220,0.7805716036414566) 100%)'
            }}>
                {children}
            </Box>
            <Box sx={{borderTop: `3px ${theme.primaryColor} solid`, background: theme.secondaryColor}} boxShadow={3}>
                <Container maxWidth={'xl'}>
                    <Box display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
                         justifyContent={'space-between'}>
                        <Box py={6}>
                            <Typography fontWeight={200} fontSize={26} ml={2} color={theme.primaryColor}
                                        fontFamily={theme.secondaryFont}
                                        sx={{
                                            borderBottom: `16px ${theme.elevationColor} solid`, lineHeight: 0,
                                            width: 'fit-content'
                                        }}
                            >
                                TattooSes
                            </Typography>
                        </Box>
                        <Typography my={'auto'} color={theme.primaryColor}>
                            &#169; All rights reserved. :)
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>

    )
}

export default MainLayout