import { getStream } from 'riot-meiosis';

import ScrollLinks from './links/scroll';

const stream = getStream();

export const componentAction = (status) => {

    stream.push({ componentAction: status });
};

export const scrollLinks = () => {

    ScrollLinks.bind();
};