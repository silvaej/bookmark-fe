import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/userActions'

const pages = ['Movies']

function Header(props: any) {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const navigate = useNavigate()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        localStorage.removeItem('__BOOKMARK_ACCESS_TOKEN__')
        props.dispatch(userActions.removeUser())
        window.location.reload()
    }

    const handleHome = () => {
        navigate('/')
    }

    return (
        <AppBar position='static' sx={{ backgroundColor: '#000000' }}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <BookmarkIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant='h6'
                        noWrap
                        onClick={handleHome}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                        }}>
                        BOOKMARK
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {localStorage.getItem(
                                '__BOOKMARK_ACCESS_TOKEN__'
                            ) &&
                                pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}>
                                        <Typography textAlign='center'>
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}

                            <MenuItem
                                key='login'
                                onClick={() => {
                                    !localStorage.getItem(
                                        '__BOOKMARK_ACCESS_TOKEN__'
                                    )
                                        ? handleLogin()
                                        : handleLogout()
                                    handleCloseNavMenu()
                                }}>
                                <Typography textAlign='center'>
                                    {!localStorage.getItem(
                                        '__BOOKMARK_ACCESS_TOKEN__'
                                    )
                                        ? 'Login'
                                        : 'Logout'}
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <BookmarkIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant='h5'
                        noWrap
                        onClick={handleHome}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        BOOKMARK
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}>
                        {localStorage.getItem('__BOOKMARK_ACCESS_TOKEN__') &&
                            pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}>
                                    {page}
                                </Button>
                            ))}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: {
                                xs: 'none',
                                md: 'flex',
                            },
                        }}>
                        {localStorage.getItem('__BOOKMARK_ACCESS_TOKEN__') ? (
                            <Button
                                variant='contained'
                                endIcon={<LogoutIcon />}
                                onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant='contained'
                                endIcon={<LoginIcon />}
                                onClick={handleLogin}>
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

function mapStateToProps(state: any) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Header)
