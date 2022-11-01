import {Box, CircularProgress, Container, Divider, Grid, Hidden, TextField, Typography} from "@mui/material";
import {useContext, useState} from "react";
import ThemeContext from "../context/ThemeContext";
import {useParams} from "react-router-dom";
import StudiosData from "../utils/StudiosData";
import TimePicker from "../components/TimePicker";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../utils/firebase-config";
import TextInput from "../components/TextInput";
import BookingsData from "../utils/BookingsData";

const StudioPage = () => {
    const params = useParams();
    const id = params.id;
    const theme = useContext(ThemeContext)

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [time, setTime] = useState('')

    async function handleSubmit(e) {
        setLoading((current) => !current);
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", document.querySelector('input[name="name"]').value);
        formData.append("email", document.querySelector('input[name="email"]').value);
        formData.append("phoneNumber", document.querySelector('input[name="phoneNumber"]').value);
        formData.append("date", document.querySelector('input[name="date"]').value);
        formData.append("message", document.querySelector('textarea[name="message"]').value);
        addDoc(collection(db, "bookings"), {
            studioId: studio.id,
            name: formData.get('name'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
            date: formData.get('date'),
            time: time,
            message: formData.get('message'),
        }).then(() => {
            setTimeout(() => {
                setLoading((current) => !current);
            }, 600);
            setDone((current) => !current);
            setTimeout(() => {
                setDone((current) => !current);
            }, 3000);
        })
    }

    const studio = StudiosData().find(studio => studio.id === id)

    const bookings = BookingsData().filter(booking => booking.data.studioId === id)

    return (
        <Container maxWidth={'xl'}>
            <Grid container>
                {studio &&
                    <>
                        <Box m={{xs: .5, md: 3}} my={{xs: 2, md: 3}} boxShadow={3} sx={{
                            p: 3,
                            borderRadius: 8,
                            background: 'rgba(255, 255, 255, 0.60)',
                            backdropFilter: 'blur(8.9px)'
                        }}>
                            <Typography pb={2} fontSize={16} color={theme.secondaryColor}
                                        fontFamily={theme.secondaryFont}>
                                Make an appointment
                            </Typography>
                            <form onSubmit={handleSubmit} method="POST">
                                <Grid container spacing={3} pb={2}>
                                    <Hidden mdDown>
                                        <Grid item xs={12} display={'flex'} alignItems={'center'}>
                                            <Typography fontSize={22} fontWeight={600}>
                                                {studio.data.name}
                                            </Typography>
                                            <Typography fontSize={22} fontWeight={300}>
                                                &nbsp;|&nbsp;{studio.data.address}
                                            </Typography>
                                        </Grid>
                                    </Hidden>
                                    <Hidden mdUp>
                                        <Grid item xs={12}>
                                            <Typography fontSize={22} fontWeight={600}>
                                                {studio.data.name}
                                            </Typography>
                                            <Typography fontSize={14} fontWeight={300}>
                                                {studio.data.address}
                                            </Typography>
                                        </Grid>
                                    </Hidden>
                                    <Grid item xs={12} md={6}>
                                        <TextInput name={'Name'} id={'name'}/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextInput name={'Email'} id={'email'}/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextInput name={'Phone number'} id={'phoneNumber'}/>
                                    </Grid>
                                    <Hidden mdDown>
                                        <Grid item xs={6}/>
                                    </Hidden>
                                    <Grid item xs={12}>
                                        <Divider variant={'fullWidth'}/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="date"
                                            name="date"
                                            label="Preferable date"
                                            type="date"
                                            fullWidth
                                            sx={{
                                                "& label.Mui-focused": {
                                                    color: theme.secondaryColor,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.secondaryColor
                                                    }
                                                }
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TimePicker time={time} setTime={setTime} bookings={bookings}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider variant={'fullWidth'}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            multiline
                                            rows={3}
                                            sx={{
                                                "& label.Mui-focused": {
                                                    color: theme.secondaryColor,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.secondaryColor
                                                    }
                                                }
                                            }}
                                            fullWidth
                                            id={'message'}
                                            name={'message'}
                                            label={'Message'}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                {loading ?
                                    <CircularProgress sx={{color: theme.secondaryColor}}/>
                                    : done ?
                                        <Box sx={{
                                            width: 'fit-content',
                                            backgroundColor: theme.textColor,
                                            fontWeight: 500,
                                            fontSize: 16,
                                            px: 3,
                                            borderWidth: 2,
                                            borderColor: theme.secondaryColor,
                                            borderStyle: 'solid',
                                            borderRadius: 4,
                                            py: 1,
                                            color: theme.primaryColor,
                                            textTransform: 'uppercase'
                                        }}
                                        >
                                            SENT
                                        </Box>
                                        :
                                        <button
                                            type="submit"
                                            style={{
                                                padding: 0,
                                                background: 'none',
                                                borderColor: 'transparent'
                                            }}
                                        >

                                            <Box sx={{
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
                                                Send
                                            </Box>
                                        </button>
                                }
                            </form>
                        </Box>
                    </>
                }
            </Grid>
        </Container>
    )
}

export default StudioPage