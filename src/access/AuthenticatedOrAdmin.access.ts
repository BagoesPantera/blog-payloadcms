import { Access } from 'payload/config'

export const AuthenticatedOrAdmin: Access = ({ req: { user } }) => {
    if (!user) return false

    if (user.collections === "admins") return true

    return {
        authorId: {
            equals: user.id
        }
    }
}