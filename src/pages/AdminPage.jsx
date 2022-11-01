import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../utils/firebase-config";
import StudiosData from "../utils/StudiosData";
import BookingsData from "../utils/BookingsData";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

const AdminPage = () => {
    const theme = useContext(ThemeContext)
    const [user, loading, error] = useAuthState(auth);

    const isAdmin = user.email === 'admin@admin.com'

    const studio = StudiosData().find(studio => studio.data.admin === user.uid)
    const bookings = BookingsData().filter(booking => booking.data.studioId === studio.id)

    return (
        <Container maxWidth={'xl'} sx={{pt: 5}}>
            <Typography fontWeight={600} variant={'h4'} mb={3} color={theme.backgroundColor}
                        fontFamily={theme.secondaryFont}
                        sx={{
                            borderBottom: `16px ${theme.elevationColor} solid`, lineHeight: .3,
                            width: 'fit-content'
                        }}
            >
                DASHBOARD
            </Typography>
            {isAdmin &&
                <Link to={'/newStudio'} style={{width: 'fit-content', textDecoration: 'none', color: 'inherit'}}>
                    <Box sx={{
                        width: 'fit-content',
                        backgroundColor: theme.secondaryColor,
                        fontWeight: 500,
                        fontSize: 16,
                        px: 3,
                        borderRadius: 4,
                        py: 1,
                        color: theme.primaryColor,
                        textTransform: 'uppercase'
                    }}
                    >
                        Create new studio
                    </Box>
                </Link>
            }
            <Divider sx={{pt: 3}}/>
            <Typography fontWeight={600} variant={'h6'} pt={3} mb={3} color={theme.backgroundColor}
                        fontFamily={theme.secondaryFont}
                        sx={{
                            borderBottom: `10px ${theme.elevationColor} solid`, lineHeight: .3,
                            width: 'fit-content'
                        }}
            >
                YOUR APPOINTMENTS
            </Typography>
            <Grid container py={3}>
                {bookings.map(booking => {
                        const time = booking.data.time.toString().split("")

                        return (
                            <Grid key={booking.data.date} item xs={12} md={4} boxShadow={5} borderRadius={8} p={3}>
                                <Typography pb={1}>
                                    {dayjs(booking.data.date).format('DD.MM.YYYY')}
                                    <b>|</b> {time.length === 4 ? time[0] + time[1] + ':' + time[2] + time[3] : time[0] + ':' + time[2] + time[3]}
                                </Typography>
                                <Divider/>
                                <Typography pt={1} fontFamily={theme.secondaryFont}>
                                    {booking.data.name}
                                </Typography>
                                <Typography>
                                    📞 {booking.data.phoneNumber}
                                </Typography>
                                <Typography>
                                    ✉️ {booking.data.email}
                                </Typography>
                                <Typography>
                                    💬 {booking.data.message}
                                </Typography>
                            </Grid>
                        )
                    }
                )}
            </Grid>
        </Container>
    )
}

export default AdminPage