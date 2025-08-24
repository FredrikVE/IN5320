function fizzBuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz";
  if (number % 3 === 0) return "Fizz";
  if (number % 5 === 0) return "Buzz";
  return String(number);
}
module.exports = fizzBuzz;


function main() {
    for (let i = 0; i <= 20; i++) {
        console.log(fizzBuzz(i));
    }
}

main();