// high order function with arrow function
const sum = (
    a: number,
    b: number,
    action: (a: number, b: number) => number,
  ): number => {
    return action(a, b);
  }
  
  // high order function with normal function
  function sum2(
    a: number,
    b: number,
    action: (a: number, b: number) => number,
  ): number {
    return action(a, b);
  }
  
  const sums = (a, b) => a + b;
  
  sum(1, 2, (num1, num2) => num1 + num2); //? => 3
  sum2(5, 5, sums); //? => 10
  