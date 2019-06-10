
import UserActions from './user/actions';
import AuthActions from './auth/actions';

export default (stream) => ({

    getAllUsers: () => {},
    user: { ...UserActions(stream) },
    auth: { ...AuthActions(stream) }
});