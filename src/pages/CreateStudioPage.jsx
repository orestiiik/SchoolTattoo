import {Box, CircularProgress, Container, Divider, Grid, Typography} from "@mui/material";
import {useContext, useState} from "react";
import ThemeContext from "../context/ThemeContext";
import {addDoc, collection} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../utils/firebase-config";
import TextInput from "../components/TextInput";

const AdminPage = () => {
    const theme = useContext(ThemeContext)
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [imageAsFile, setImageAsFile] = useState('')

    async function handleSubmit(e) {
        setLoading((current) => !current);
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", document.querySelector('input[name="name"]').value);
        formData.append("address", document.querySelector('input[name="address"]').value);

        const storageRef = ref(storage, `/studioImages/${formData.get('name')}`);
        const uploadImage = uploadBytesResumable(storageRef, imageAsFile);

        uploadImage.on('state_changed',
            () => {
            }, (err) => {
                console.log(err)
            }, () => {
                getDownloadURL(uploadImage.snapshot.ref)
                    .then(fireBaseUrl => {
                        addDoc(collection(db, "studios"), {
                            name: formData.get('name'),
                            address: formData.get('address'),
                            image: fireBaseUrl
                        }).then(() => {
                            setTimeout(() => {
                                setLoading((current) => !current);
                            }, 600);
                            setDone((current) => !current);
                            setTimeout(() => {
                                setDone((current) => !current);
                            }, 3000);
                        })
                    })
            })
    }

    const handleImage = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    return (
        <Container maxWidth={'xl'}>
            <Box pt={5}/>
            <Box boxShadow={3} sx={{
                p: 3,
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.60)',
                backdropFilter: 'blur(8.9px)',
                minWidth: '75%',
                width: 'fit-content',
                mx: 'auto'
            }}>
                <Typography pt={2} variant={'h4'} color={theme.secondaryColor}
                            fontFamily={theme.secondaryFont}>
                    Create new studio
                </Typography>
                <form onSubmit={handleSubmit} method="POST">
                    <Grid container spacing={3} pb={2}>
                        <Grid item xs={12}>
                            <Typography variant={'subtitle1'}>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput name={'Name'} id={'name'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput name={'Address'} id={'address'}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant={'fullWidth'}/>
                        </Grid>
                        <Grid item xs={6}>
                            <input
                                onChange={handleImage}
                                type="file"
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
                                DONE
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
                                    Create
                                </Box>
                            </button>
                    }
                </form>
            </Box>
        </Container>
    )
}

export default AdminPage