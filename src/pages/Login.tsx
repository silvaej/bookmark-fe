import { Button, Container, Typography } from '@mui/material'
import Sheet from '@mui/joy/Sheet'
import { TextField } from '@mui/joy'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/userActions'
import decode from '../utils/decode'
import { login } from '../utils/authApi'

function Login(props: any) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()
    const { dispatch } = props

    const handleSubmit = async () => {
        const {
            success,
            data,
            error: responseError,
        } = await login(email, password)
        if (success && data) {
            const user = decode(data)
            dispatch(userActions.createUser(user))
            localStorage.setItem('__BOOKMARK_ACCESS_TOKEN__', data)
            navigate('/')
        } else {
            responseError && setError(responseError)
        }
    }

    return (
        <Container maxWidth='xl'>
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto',
                    my: 20, // margin top & botom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant='outlined'>
                <div>
                    <Typography variant='h4'>
                        <b>Welcome!</b>
                    </Typography>
                    <Typography variant='body2'>
                        Sign in to continue.
                    </Typography>
                </div>
                {error && (
                    <Typography variant='body2' sx={{ color: 'red' }}>
                        {error}!
                    </Typography>
                )}
                <TextField
                    name='email'
                    type='email'
                    placeholder='juandelacruz@example.com'
                    label='Email'
                    onChange={(e: FormEvent<HTMLInputElement>) =>
                        setEmail(e.currentTarget.value)
                    }
                />
                <TextField
                    name='password'
                    type='password'
                    placeholder='password'
                    label='Password'
                    onChange={(e: FormEvent<HTMLInputElement>) =>
                        setPassword(e.currentTarget.value)
                    }
                />
                <Button
                    sx={{ mt: 1 }}
                    variant='contained'
                    onClick={handleSubmit}
                    disabled={!email || !password}>
                    Log in
                </Button>
                <Typography fontSize='sm' sx={{ alignSelf: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <Link to='/register'>Sign up</Link>
                </Typography>
            </Sheet>
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Login)
