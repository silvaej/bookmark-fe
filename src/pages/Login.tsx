import { Button, Container, Typography } from '@mui/material'
import Sheet from '@mui/joy/Sheet'
import { TextField } from '@mui/joy'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
import * as userActions from '../redux/actions/userActions'

function Login(props: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/auth?email=${email}&password=${password}`
            )
            if (result.data.ok) {
                const decoded = jwt_decode(result.data.token)
                let user = {}
                if (decoded instanceof Object) {
                    Object.entries(decoded).forEach((el) => {
                        if (['id', 'email', 'username'].includes(el[0]))
                            user = { ...user, [el[0]]: el[1] }
                    })
                }
                props.dispatch(userActions.createUser(user))
                localStorage.setItem(
                    '__BOOKMARK_ACCESS_TOKEN__',
                    result.data.token
                )
                navigate('/')
            }
        } catch (err) {
            if (err instanceof AxiosError) setError(err.response!.data.reason)
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
        users: state.users,
    }
}

export default connect(mapStateToProps)(Login)
