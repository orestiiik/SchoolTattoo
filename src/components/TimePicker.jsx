import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";

const TimePicker = ({time, setTime, bookings}) => {
    const theme = useContext(ThemeContext)

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    const times = [
        {value: 800, label: '8:00'},
        {value: 900, label: '9:00'},
        {value: 1000, label: '10:00'},
        {value: 1100, label: '11:00'},
        {value: 1200, label: '12:00'},
        {value: 1300, label: '13:00'},
        {value: 1400, label: '14:00'},
        {value: 1500, label: '15:00'},
        {value: 1600, label: '16:00'},
        {value: 1700, label: '17:00'},
    ]


    return (
        <>
            <FormControl fullWidth>
                <InputLabel sx={{
                    "&.Mui-focused": {
                        color: theme.secondaryColor,
                    },
                }}>Preferable time</InputLabel>

                <Select
                    id="time"
                    label="Preferable time"
                    value={time}
                    onChange={handleChange}
                    sx={{
                        "&.MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: theme.secondaryColor
                            }
                        }
                    }}
                >
                    {
                        times.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>

    )
}

export default TimePicker