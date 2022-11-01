import {Box, Container, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import StudioCard from "../components/StudioCard";
import ThemeContext from "../context/ThemeContext";
import StudiosData from "../utils/StudiosData";
import {Link} from "react-router-dom";


const HomePage = () => {
    const theme = useContext(ThemeContext)

    return (
        <>
            <Container maxWidth={'xl'}>
                <Grid container py={6}>
                    <Grid xs={12} md={6} height={'100%'}>
                        <Typography fontSize={{xs: 32, md: 68}} pt={2} fontWeight={500} fontFamily={theme.secondaryFont}>
                            Appointments made&nbsp;
                            <span className={'secondaryFont'}
                                  style={{color: theme.secondaryColor}}>
                             <u>easy</u>
                        </span>
                            <br/>for you
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={6} maxHeight={{xs: 260, md: 460}} sx={{
                        borderRadius: 6,
                        overflow: 'hidden',
                        '&:hover': {
                            '& img': {
                                transform: 'scale(1.2)',
                                transition: 'transform .6s'
                            }
                        }
                    }} boxShadow={6}>
                        <img src={'/images/bg.jpg'} style={{
                            transition: 'transform 1s',
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                        }}/>
                    </Grid>
                </Grid>
                <Box width={'fit-content'} mx={'auto'} pt={4} pb={6}>
                    <Typography pt={2} fontSize={{xs: 28, md: 33}}
                                sx={{borderBottom: `16px ${theme.elevationColor} solid`, lineHeight: .3}}
                                color={theme.backgroundColor}
                                textAlign={'left'} fontFamily={theme.secondaryFont}>
                        Choose a studio
                    </Typography>
                </Box>
                <Grid container display={'flex'} spacing={3}>
                    {StudiosData() && StudiosData().slice(0, 5).map(item =>
                        <Grid key={item.data.name} item xs={12} md={6} xl={4} minHeight={'100%'}>
                            <StudioCard studio={item}/>
                        </Grid>
                    )}
                    <Grid item xs={12} md={6} xl={4} minHeight={{xs: 200, md: '100%'}}>
                        <Link to={`/studios`} style={{textDecoration: 'none', color: 'inherit'}}>
                            <Box boxShadow={6} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 8,
                                background: 'rgba(255, 255, 255, 0.60)',
                                backdropFilter: 'blur(8.9px)',
                                minHeight: '100%',
                                '&:hover': {
                                    '& img': {
                                        transform: 'scale(1.2)',
                                        transition: 'transform .3s'
                                    }
                                }
                            }}>
                                <Typography variant={'h4'} fontFamily={theme.secondaryFont}
                                sx={{
                                    borderBottom: `16px ${theme.elevationColor} solid`, lineHeight: .3,
                                    width: 'fit-content'
                                }}>
                                    SHOW ALL
                                </Typography>
                            </Box>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{background: theme.elevationColor}} mt={8}>
                <Container maxWidth={'xl'}>
                    <Grid container py={6}>
                        <Grid xs={12} md={6} maxHeight={360} sx={{
                            borderRadius: 6,
                            overflow: 'hidden',
                            '&:hover': {
                                '& img': {
                                    transform: 'scale(1.2)',
                                    transition: 'transform .6s'
                                }
                            }
                        }} boxShadow={6}>
                            <img src={'/images/owner.jpg'} style={{
                                transition: 'transform 1s',
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover'
                            }}/>
                        </Grid>
                        <Grid xs={12} md={6} pt={{xs: 6, md: 0}} height={'100%'} pl={{xs: 0, md: 4}} py={2}>
                            <Typography fontSize={48} fontFamily={theme.secondaryFont} color={theme.primaryColor} sx={{
                                borderBottom: `16px ${theme.secondaryColor} solid`, lineHeight: .3,
                                width: 'fit-content'
                            }}>
                                OWNER?
                            </Typography>
                            <Typography fontSize={{xs: 20, md: 32}} pt={2} fontWeight={500}>
                                Do you own a tattoo studio? Contact us and we can ad you to our <b>TattooSes</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default HomePage