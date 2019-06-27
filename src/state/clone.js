import Erre from 'erre';

/**
 * Clone original stream.
 * Ends and deletes cloned stream when it has ended.
 * Idea from discussion with GianlucaGuarini
 * https://github.com/riot/riot/issues/2708#issuecomment-501443045
 */

// function called only the first time a source stream will be cloned
function init(source) {

    const children = new Set();
    source.children = children;

    // dispatch the new values to all the connected pipes
    source.on.value((val) => {

        children.forEach((child) => {

            child.push(val);
        });
    });

    // if the original source stream ends we will kill all the children streams
    source.on.end(val => {

        children.forEach(c => c.end());
        children.clear();
    });

    return source;
}

// clone a source stream to a new one freshly created
export default function clone(source) {

    const child = Erre();

    // check if the source stream gets cloned for the first time
    // we need to subscribe its source.children to its on.value events
    if (!source.children) {
        init(source);
    }

    // simply add the new child stream to the children set
    source.children.add(child);

    // make sure that if a child will be ended from the outside
    // it will be removed from the children list
    child.on.end(() => source.children.delete(child));

    return child;
}