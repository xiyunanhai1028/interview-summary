var source = {
  a: {
    b: {
      c: "1",
    },
    d: "2",
  },
  e: "3",
};


function flat(source, result = {}, str) {
  const keys = Object.keys(source);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = source[key];
    if (typeof value === 'object' && value !== null) {
      flat(value, result, str ? str + '.' + key : key);
    } else {
      result[str ? `${str + '.' + key}` : key] = value;
    }
  }
  return result;
}


var target = flat(source);
console.log(target);