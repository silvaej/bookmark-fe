import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Homepage(props: any) {
    const user = props.users

    return (
        <Container maxWidth='xl'>
            <h1>Welcome {user.username ? user.username : 'to Bookmark'}!</h1>
            {!user.id && <Link to='/login'>Login</Link>}
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(Homepage)
