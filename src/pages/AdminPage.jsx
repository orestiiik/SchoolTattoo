import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";
import {useAuthState} from "react-firebase-hooks/auth";
import StudiosData from "../utils/StudiosData";
import BookingsData from "../utils/BookingsData";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {IconCheck, IconPlus, IconTrash} from "@tabler/icons";
import {auth, db} from "../utils/firebase-config";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";

const AdminPage = () => {
    const theme = useContext(ThemeContext)
    const [user, loading, error] = useAuthState(auth);

    const isAdmin = user.email === 'admin@admin.com'

    const studio = StudiosData().find(studio => studio.data.admin === user.uid)
    const bookings = BookingsData().filter(booking => booking.data.studioId === studio.id)

    return (
        <Container maxWidth={'xl'} sx={{pt: 5}}>
            <Box display={'flex'} flexDirection={{xs: 'column', md: 'row'}} justifyContent={'space-between'}
                 width={'100%'}>
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
                            display: 'flex',
                            alignItems: 'center',
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
                            <IconPlus/>&nbsp; Create new studio
                        </Box>
                    </Link>
                }
            </Box>
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
            <Grid container pb={3}>
                {bookings.filter(booking => !booking.data.archived).map(booking => {
                        const time = booking.data.time.toString().split("")
                        return (
                            <Grid key={booking.data.date} item xs={12} md={4} boxShadow={5} borderRadius={8} p={3} m={1}>
                                <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                                    <Typography pb={1}>
                                        {dayjs(booking.data.date).format('DD.MM.YYYY')}
                                        <b>|</b> {time.length === 4 ? time[0] + time[1] + ':' + time[2] + time[3] : time[0] + ':' + time[2] + time[3]}
                                    </Typography>
                                    <Box display={'flex'} gap={1}>
                                        <IconCheck
                                            color={'green'}
                                            style={{cursor: 'pointer'}}
                                            onClick={async () => await updateDoc(doc(db, "bookings", booking.id), {
                                                ...booking.data,
                                                archived: true
                                            })}
                                        />
                                        <IconTrash
                                            color={'red'}
                                            style={{cursor: 'pointer'}}
                                            onClick={async () => await deleteDoc(doc(db, "bookings", booking.id))}
                                        />
                                    </Box>
                                </Grid>
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
            <Divider sx={{pt: 3}}/>
            <Typography fontWeight={600} variant={'h6'} pt={3} mb={3} color={theme.backgroundColor}
                        fontFamily={theme.secondaryFont}
                        sx={{
                            borderBottom: `10px ${theme.elevationColor} solid`, lineHeight: .3,
                            width: 'fit-content'
                        }}
            >
                YOUR PAST APPOINTMENTS
            </Typography>
            <Grid container pb={3}>
                {bookings.filter(booking => booking.data.archived).map(booking => {
                        const time = booking.data.time.toString().split("")
                        return (
                            <Grid key={booking.data.date} item xs={12} md={4} boxShadow={5} borderRadius={8} p={3} m={1}>
                                <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                                    <Typography pb={1}>
                                        {dayjs(booking.data.date).format('DD.MM.YYYY')}
                                        <b>|</b> {time.length === 4 ? time[0] + time[1] + ':' + time[2] + time[3] : time[0] + ':' + time[2] + time[3]}
                                    </Typography>
                                    <Box display={'flex'} gap={1}>
                                        <IconTrash
                                            color={'red'}
                                            style={{cursor: 'pointer'}}
                                            onClick={async () => await deleteDoc(doc(db, "bookings", booking.id))}
                                        />
                                    </Box>
                                </Grid>
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