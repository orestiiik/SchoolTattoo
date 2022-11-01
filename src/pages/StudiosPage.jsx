import {Box, Container, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import StudioCard from "../components/StudioCard";
import ThemeContext from "../context/ThemeContext";
import StudiosData from "../utils/StudiosData";


const HomePage = () => {
    const theme = useContext(ThemeContext)

    return (
        <>
            <Container maxWidth={'xl'}>
                <Box width={'fit-content'} mx={'auto'} pt={4} pb={6}>
                    <Typography pt={2} fontSize={{xs: 26, md: 42}}
                                sx={{borderBottom: `16px ${theme.elevationColor} solid`, lineHeight: .3}}
                                color={theme.backgroundColor}
                                textAlign={'left'} fontFamily={theme.secondaryFont}>
                        List of studios
                    </Typography>
                </Box>
                <Grid container display={'flex'} spacing={3} pb={6}>
                    {StudiosData() && StudiosData().map(item =>
                        <Grid key={item.data.name} item xs={12} md={6} xl={4} minHeight={'100%'}>
                            <StudioCard studio={item}/>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    )
}

export default HomePage