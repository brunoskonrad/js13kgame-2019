export function delay(callback, wait) {
  let timeout = null;
  let canCall = true;

  return function() {
    const next = () => {
      callback.apply(this, arguments);
      timeout = null;
    };

    if (canCall) {
      canCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(() => {
        canCall = true;
      }, wait);
    }
  };
}
