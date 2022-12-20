import { Container } from '@mui/material'
import { Link } from 'react-router-dom'

function Homepage() {
    return (
        <Container maxWidth='xl'>
            <h1>Welcome to bookmark</h1>
            <Link to='/login'>Login</Link>
        </Container>
    )
}

export default Homepage
