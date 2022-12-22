import jwt_decode from 'jwt-decode'

export default function decodeToken(token: string) {
    const decoded = jwt_decode(token)
    let user = {}
    if (decoded instanceof Object) {
        Object.entries(decoded).forEach((el) => {
            if (['id', 'email', 'username'].includes(el[0]))
                user = { ...user, [el[0]]: el[1] }
        })
    }
    return user
}
