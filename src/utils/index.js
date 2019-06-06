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
