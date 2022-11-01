import {Box, CircularProgress, Container, Grid, TextField, Typography} from "@mui/material";
import ThemeContext from "../context/ThemeContext";
import React, {useState, useContext} from "react";
import TextInput from "../components/TextInput";

export default function ContactPage() {
    const theme = useContext(ThemeContext)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);

    async function handleSubmit(e) {
        setLoading((current) => !current);
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", document.querySelector('input[name="name"]').value);
        formData.append("email", document.querySelector('input[name="email"]').value);
        formData.append("message", document.querySelector('textarea[name="message"]').value);
        const res = await fetch("https://getform.io/f/b3c7a234-4ab5-424c-91bf-d881baefbb11", {
            method: "POST", body: formData,
        }).catch((error) => console.log(error));
        if (res.redirected === true) {
            setTimeout(() => {
                setLoading((current) => !current);
            }, 600);
            setDone((current) => !current);
            setTimeout(() => {
                setDone((current) => !current);
            }, 3000);
        }
        if (res.redirected === false) {
            setError((current) => !current);
        }
    }

    return (<section>
        <Container maxWidth={'xl'}>
            <Grid container pt={5} pb={3}>
                <Grid item xs={12} md={6} my={'auto'} pr={{xs: 0, md: 4}}>
                    <Typography fontWeight={600} variant={'h4'} mb={3} color={theme.backgroundColor}
                                fontFamily={theme.secondaryFont}
                                sx={{
                                    borderBottom: `16px ${theme.elevationColor} solid`, lineHeight: .3,
                                    width: 'fit-content'
                                }}
                    >
                        Contact us
                    </Typography>
                    <form onSubmit={handleSubmit} method="POST">
                        <Box py={1}>
                            <TextInput name={'Name'} id={'name'}/>
                        </Box>
                        <Box py={1}>
                            <TextInput name={'Email'} id={'email'}/>
                        </Box>
                        <Box py={1}>
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
                        </Box>
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
                </Grid>
                <Grid xs={12} md={6} minHeight={'100%'} sx={{
                    borderRadius: 6,
                    overflow: 'hidden',
                    '&:hover': {
                        '& img': {
                            transform: 'scale(1.2)',
                            transition: 'transform .6s'
                        }
                    }
                }} boxShadow={6}>
                    <img src={'/images/contact.jpg'} style={{
                        transition: 'transform 1s',
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'
                    }}/>
                </Grid>
            </Grid>
        </Container>
    </section>)
};