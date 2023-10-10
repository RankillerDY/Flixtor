import { Button, Menu, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { UserAuth } from '../firebase/Authe';
import { CSSProperties } from 'react';


const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { theme, toggle } = useContext(ThemeContext);

    const { user, logOut, googleSignIn } = UserAuth();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const styleAvatar = {
        position: "absolute",
        top: "50%",
        left: "15px",
        fontSize: "larger",
        zIndex: 1,
        transform: "translateY(-50%)",
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        try {
            await logOut()
            navigate('/')

        } catch (error) {
            console.log(error);
        }
    }
    const ButtonStyle: CSSProperties = {
        marginTop: 2,
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: "9px",
        display: "flex",
        fontFamily: "Outfit",
        fontSize: "1.2rem",
        justifyContent: "center",
        width: "55px",
        padding: "5.625px 11.25px",
        textAlign: "center",
        height: "55px"
    }
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate('/Dashboard')
        }
    }, [])

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className='container-fluid Heading' style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            outline: 'none',
        }}>
            <nav >
                <div className='container-fluid Navigation'>
                    <div className='header-wrapper'>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <i className="fa-sharp fa-solid fa-book-medical"></i>
                        </Button>

                        <Link to={`/`}><img src='assets/logo.png' className='header_img'></img></Link>

                        <form action="#" className="search-form">
                            <input type="text" className="search-bar"
                                placeholder="Search Movies..." />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </form>

                        <div className="check">
                            <input
                                id="check"
                                type="checkbox"
                                onClick={toggle}

                                data-testid="toggle-theme-btn"
                            />
                            <label htmlFor="check"></label>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {user?.displayName ? (
                                <div>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={user.email} src={user.photoURL} sx={styleAvatar} />

                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"  ><Link to='/Dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Typography>
                                        </MenuItem>
                                        <MenuItem>
                                            <Typography textAlign="center" onClick={handleSignOut}>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <span style={ButtonStyle}>
                                    <Button
                                        sx={{ padding: 0 }}
                                        onClick={handleGoogleSignIn}
                                    >
                                        {/* Sign in */}
                                        <i className='bi bi-person-workspace' style={{ backgroundColor: 'black', padding: 0, color: 'white' }}></i>
                                    </Button>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {/* <h5>Find Movies, TV shows and more</h5> */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Link to={`/`} style={{ textDecoration: 'none', color: "black" }}>  <MenuItem onClick={handleClose}>Home</MenuItem></Link>
                <Link to={`/About`} style={{ textDecoration: 'none', color: "black" }}> <MenuItem onClick={handleClose}>About</MenuItem></Link>
                <Link to={`/Contact`} style={{ textDecoration: 'none', color: "black" }}> <MenuItem onClick={handleClose}>Contact</MenuItem></Link>
            </Menu>

        </div>
    )
}

export default Header