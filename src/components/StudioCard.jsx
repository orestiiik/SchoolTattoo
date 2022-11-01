import {Box, Grid, Typography} from "@mui/material";
import ThemeContext from "../context/ThemeContext";
import {useContext} from "react";
import {Link} from "react-router-dom";

const StudioCard = ({studio}) => {
    const theme = useContext(ThemeContext)

    return (
        <Link to={`/${studio.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <Box boxShadow={6} sx={{
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
                <Grid container p={2.1}>
                    <Grid item xs={12} md={4} maxHeight={180} minHeight={180} borderRadius={6} overflow={'hidden'}>
                        <img src={studio.data.image}
                             style={{transition: 'transform .4s', height: '100%', width: '100%', objectFit: "cover"}}/>
                    </Grid>
                    <Grid item xs={12} md={8} pl={{xs: 0, md: 3}}>
                        <Typography variant={'h4'}>
                            {studio.data.name}
                        </Typography>
                        <Typography fontSize={12} pl={0.5} pt={1}>
                            {studio.data.address}
                        </Typography>

                        <Box sx={{
                            background: theme.secondaryColor,
                            color: theme.primaryColor,
                            width: 'fit-content',
                            px: 2,
                            py: 1.5,
                            mt: 2,
                            fontSize: 12,
                            borderRadius: 5,
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}>
                            GET AN APPOINTMENT
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Link>

    )
}

export default StudioCard