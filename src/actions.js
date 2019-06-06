import ComponentActions from './components/actions';
import viewport from 'bianco.viewport';

// Generic actions store
export default (stream) => ({

    screenChecks: () => {

        stream.push({
            isMobile: viewport.documentWidth() < 16 * 40 // 640 px
        });
    },

    // Splat component actions into main actions store
    ...ComponentActions(stream)
});