/**
 * Prevents a function from being repeatedly executed. Delays next execution by `wait` milliseconds
 * @param {function} func Function to be debounced
 * @param {number} wait Time to wait until next execution in milliseconds
 * @param {boolean} immediate Execute immediately every `wait` milliseconds
 */
export const debounce = function(func, wait, immediate) {
    var timeout;
    return function() {

        var context = this, args = arguments;

        var later = function() {

            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);

        // Returns option to cancel
        return {
            cancel: function() {

                clearTimeout(timeout);
            }
        }
    };
};
