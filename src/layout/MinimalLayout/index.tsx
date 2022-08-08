import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import logo from '../../assets/images/Logo.png';
import man from '../../assets/images/auth/Man.png';
import woman from '../../assets/images/auth/Woman.png';
// project imports
// import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <>
    <Grid container sx={{ height: "100%" }}>
      <Grid container item xs={6}
        direction="column"
        sx={{ height: "100%", background: '0% 0% no-repeat padding-box;', backgroundColor: 'background.paper' }}
      >
        <Grid item container xs={6}
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPositionX: "center",
            flex: "0 0 60%",
            width: "100%"
          }}></Grid>
        </Grid>
        <Grid item container xs={6}
          flexWrap="nowrap"
          sx={{ height: "50%", }}>
          <Grid item sx={{
            backgroundImage: `url(${woman})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPositionY: "bottom",
            flex: "0 1 23%",
          }}></Grid>
          <Grid item xs></Grid>
          <Grid item sx={{
            backgroundImage: `url(${man})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPositionY: "bottom",
            backgroundPositionX: "right",
            flex: "0 1 60%",
          }}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} sx={{
        background: "transparent linear-gradient(180deg, #8556A4 0%, #2D2B52 100%) 0% 0% no-repeat padding-box",
        border: "1px solid #707070"
      }}>
        <Outlet />
      </Grid>
    </Grid>
    {/* <Customization /> */}
  </>
);

export default MinimalLayout;
