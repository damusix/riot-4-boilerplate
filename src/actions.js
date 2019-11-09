import { getStream } from 'riot-meiosis';
import viewport from 'bianco.viewport';

const stream = getStream();

export function screenChecks () {

    stream.push({
        isMobile: viewport.documentWidth() < 16 * 40 // 640 px
    });
};
