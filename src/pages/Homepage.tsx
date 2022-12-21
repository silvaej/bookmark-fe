import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

type DecodedToken = {
    email: string
    exp: number
    iat: number
    id: string
    jti: string
    password: string
    type: string
    username: string
}

function Homepage() {
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [uid, setUid] = useState('')

    useEffect(() => {
        const ACCESS_TOKEN = localStorage.getItem('__BOOKMARK_ACCESS_TOKEN__')
        if (ACCESS_TOKEN) setToken(ACCESS_TOKEN)
    }, [])

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token)
            if (decoded instanceof Object) {
                Object.entries(decoded).forEach((el) => {
                    if (el[0] === 'id') setUid(el[1])
                    else if (el[0] === 'username') setName(el[1])
                })
            }
        }
    }, [token])

    return (
        <Container maxWidth='xl'>
            <h1>Welcome {name ? name : 'to Bookmark'}!</h1>
            {!token && <Link to='/login'>Login</Link>}
        </Container>
    )
}

export default Homepage
