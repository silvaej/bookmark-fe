export function createUser(user: any) {
    // TODO add the type for this
    return { type: 'CREATE_USER', user }
}

export function removeUser() {
    return { type: 'REMOVE_USER' }
}
