import ScrollLinks from './links/scroll';
import ExampleActions from './example/actions';
import UsersActions from './users/actions';

export default (stream, state, actions) => ({

    componentAction: (status) => {

        console.log(actions);
        stream.push({ componentAction: status });
    },

    scrollLinks: () => {

        ScrollLinks.bind();
    },

    ...ExampleActions(stream, state, actions),
    ...UsersActions(stream, state, actions)
});