import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import * as userActions from '../redux/actions/userActions'
import decode from '../utils/decode'

function Homepage(props: any) {
    const user = props.user

    useEffect(() => {
        if (!user.id) {
            const ACCESS_TOKEN = localStorage.getItem(
                '__BOOKMARK_ACCESS_TOKEN__'
            )
            if (ACCESS_TOKEN) {
                const user = decode(ACCESS_TOKEN)
                props.dispatch(userActions.createUser(user))
            }
        }
    }, [])

    return (
        <Container maxWidth='xl'>
            <h1>Welcome {user.username ? user.username : 'to Bookmark'}!</h1>
            {!user.id && <Link to='/login'>Login</Link>}
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Homepage)
