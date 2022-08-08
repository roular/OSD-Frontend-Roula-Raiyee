import avatar from '../../assets/images/main/Bitmap@2x.png';

const ProfileAvatar = ({width}: {width?: string | number}) => {

    return (
        <img src={avatar} alt="ok" width={width}/>
    );
};

export default ProfileAvatar;