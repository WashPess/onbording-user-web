
export const Debounce = (func: Function, wait: number) => {
  let timeout = setTimeout(()=> {} , 1);

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
