import ScrollLinks from './links/scroll';
import ExampleActions from './example/actions';

export default (stream) => ({

    componentAction: (status) => {

        stream.push({ componentAction: status });
    },

    scrollLinks: () => {

        ScrollLinks.bind();
    },

    ...ExampleActions(stream)
});