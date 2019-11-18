import { getStream } from 'riot-meiosis';

const stream = getStream();

export const componentAction = (status) => {

    stream.push({ componentAction: status });
};

export const scrollLinks = () => {

    ScrollLinks.bind();
};