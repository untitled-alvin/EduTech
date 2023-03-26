export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return capitalize(this)
  },
  enumerable: false
});

