import { Box, Grid, Typography, useTheme } from "@mui/material"
import { Container } from "@mui/system"

import * as Yup from 'yup';
import { Formik } from 'formik';
import LoginForm from "./forms/login-form";
import { Outlet } from "react-router";

// import {Visibility} from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="xs" sx={{ height: "100%", }}>
            <Grid container direction="column" columns={10} sx={{ height: "100%" }}>
                <Grid item xs={2}></Grid>
                <Grid item>
                    <Typography variant="h1" component="div" gutterBottom sx={{
                        color: 'white', font: "normal normal 100 60px/70px HelveticaNeue",
                        letterSpacing: "0px"
                    }}> Time to work!</Typography>
                    <Outlet />
                    {/* <MyForm /> */}
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginPage