import logo from '../../assets/images/Logo.png';

const Logo = ({width}: {width: number}) => {

    return (
        <img src={logo} alt="ok" width={width}/>
    );
};

export default Logo;
