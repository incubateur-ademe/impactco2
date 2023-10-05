// const person = {
//   name: 'Pete',
//   dog: 'Daffodil',
//   cat: 'Omar',
// };

// const dogPerson = pick(person, 'name', 'dog');
// => dogPerson is { name: "Pete", dog: "Daffodil" }
export function pick(obj, ...props) {
  return props.reduce(function (result, prop) {
    result[prop] = obj[prop];
    return result;
  }, {});
}
