import { Access } from 'payload/config'

export const AuthenticatedUser: Access = ({ req: { user } }) => {
    return user;
}