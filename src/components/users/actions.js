
import UserActions from './user/actions';
import AuthActions from './auth/actions';

export default (stream, state, actions) => ({

    getAllUsers: () => {},
    user: { ...UserActions(stream, state, actions) },
    auth: { ...AuthActions(stream, state, actions) }
});