import { Sheet, TextField } from '@mui/joy'
import { Button, Container, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../utils/authApi'

function Signup() {
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [registered, setRegistered] = useState<boolean>(false)

    const handleSubmit = async () => {
        if (password === confirmPassword) {
            const { success, error: responseError } = await signup(
                email,
                username,
                password
            )
            if (success) {
                setRegistered(true)
            } else {
                responseError && setError(responseError)
            }
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
                        <b>Welcome to Bookmark!</b>
                    </Typography>
                    {!registered ? (
                        <Typography variant='body2'>
                            Signup to access all our services.
                        </Typography>
                    ) : (
                        <Typography variant='body2'>
                            Thank you for signing up to Bookmark! Login{' '}
                            <Link to='/login'>here</Link>.
                        </Typography>
                    )}
                </div>
                {!registered && (
                    <>
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
                            name='username'
                            type='text'
                            placeholder='jdelacruz1'
                            label='Username'
                            onChange={(e: FormEvent<HTMLInputElement>) =>
                                setUsername(e.currentTarget.value)
                            }
                        />
                        <TextField
                            name='password'
                            type='password'
                            placeholder='Password'
                            label='Password'
                            onChange={(e: FormEvent<HTMLInputElement>) =>
                                setPassword(e.currentTarget.value)
                            }
                        />
                        <TextField
                            name='confirm_password'
                            type='password'
                            placeholder='Confirm Password'
                            label='Confirm Password'
                            onChange={(e: FormEvent<HTMLInputElement>) =>
                                setConfirmPassword(e.currentTarget.value)
                            }
                        />
                        <Button
                            sx={{ mt: 1 }}
                            variant='contained'
                            disabled={
                                !email ||
                                !username ||
                                !password ||
                                !confirmPassword ||
                                password !== confirmPassword
                            }
                            onClick={handleSubmit}>
                            Sign Up
                        </Button>
                        <Typography fontSize='sm' sx={{ alignSelf: 'center' }}>
                            Already have an account?{' '}
                            <Link to='/login'>Login</Link>
                        </Typography>
                    </>
                )}
            </Sheet>
        </Container>
    )
}

export default Signup
