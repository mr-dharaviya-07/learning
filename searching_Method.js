

const array = ["one","two","three","four","three","five","six"];


//find index of the value
const index = array.indexOf("four");
console.log(index);



//find the last index of the vlaue
const lastIndex = array.lastIndexOf("three");
console.log(lastIndex);


//return the true if the element is on the array
console.log(array.includes("four"));



//return the first element of the array that to assepct the condition
const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(first);




//find the index of the element 
const numbers1 = [4, 9, 16, 25, 29];
let Index = numbers1.findIndex(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(Index);


//start from the end of an array and return the value of the first element that satisfies a condition.
const temp = [27, 28, 30, 40, 42, 35, 30];
let high = temp.findLast(x => x > 40);
console.log(high);
