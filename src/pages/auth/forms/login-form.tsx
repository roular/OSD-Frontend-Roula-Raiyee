import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'

// material-ui
import {
    Backdrop,
    Box,
    Button, CircularProgress, FormControl, FormHelperText, IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from '../../../components/ui-elements/AnimateButton';
import { setUser } from '../../../store/features/user/userSlice';
import { setCards } from '../../../store/features/cards/cardsSlice';
import { useNavigate } from 'react-router';
import { selectUserId } from '../../../store/features/user/user.selectors';

// assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';



// ============================|| FIREBASE - LOGIN ||============================ //

const LoginForm = ({ ...others }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Formik
            initialValues={{
                email: 'info@codedthemes.com',
                password: '123456',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                var config = {
                    method: 'post',
                    url: 'https://localhost:7028/api/persons/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(values)
                };
                setSubmitting(true);
                await axios(config)
                    .then(function (response) {
                        setSubmitting(false);
                        dispatch(setUser(response.data));
                        var data = JSON.stringify({
                            "Personid": response.data.id
                        });
                        var config = {
                            method: 'post',
                            url: 'https://localhost:7028/api/cards/all',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios(config)
                            .then(function (response) {
                                dispatch(setCards(response.data));
                            })
                            .catch(function (error) {

                            });
                        navigate('/', { replace: true })
                    })
                    .catch(function (error) {
                        setSubmitting(false);
                        setStatus({ success: false });
                        setErrors({ submit: error.response.data });
                        console.log(error);
                    });

            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setSubmitting }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput, mb: 4 }}>
                        <InputLabel htmlFor="outlined-adornment-email-login" shrink>Email Address / Username</InputLabel>
                        <OutlinedInput
                            sx={{ mb: 0.5 }}
                            id="outlined-adornment-email-login"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email Address / Username"
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText sx={{ m: 0, pl: 0.5, height: 0 }} error id="standard-weight-helper-text-email-login">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        sx={{ ...theme.typography.customInput, mb: 4 }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password-login" shrink>Password</InputLabel>
                        <OutlinedInput
                            sx={{ mb: 0.5 }}
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            inputProps={{}}
                        />
                        {touched.password && errors.password && (
                            <FormHelperText sx={{ m: 0, pl: 0.5, height: 0 }} error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    {errors.submit && (
                        <Box>
                            <FormHelperText sx={{ m: 0, pl: 0.5, height: 0, transform: 'translateY(-12px)' }} error>{errors.submit}</FormHelperText>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Sign in
                            </Button>
                        </AnimateButton>
                    </Box>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isSubmitting}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            )
            }
        </Formik >
    );
};

export default LoginForm