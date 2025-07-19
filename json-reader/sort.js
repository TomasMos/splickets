const numbers = [42, 13, 7, 99, 25];

console.log("Original:", [...numbers]);

const sorted = [...numbers].sort((a, b) => {
  console.log(`Comparing a=${a}, b=${b}`);
  
  const result = a - b;

  console.log("Intermediate:", [...numbers]); // doesn't reflect sorting!
  return result;
});

console.log("Final sorted:", sorted);
