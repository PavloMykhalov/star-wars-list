//function for making an array from number for pagination
export function getNumber(num: number): number[] {
  const numbers = [];

  for (let i = 1; i <= num; i++) {
    numbers.push(i);
  }

  return numbers;
}