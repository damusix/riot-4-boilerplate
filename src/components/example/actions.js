import { getStream } from 'riot-meiosis';

const stream = getStream();

export const sampleApiCall = (apiCalls = 0) => {

    stream.push({ loading: true });
    setTimeout(() => {

        ++apiCalls
        stream.push({
            apiCalls,
            loading: false
        });
    }, 1000);
}