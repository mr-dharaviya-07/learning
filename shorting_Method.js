
const numArray = ["one","two","three","four","five"];



//sorting the array of the alphabatical order
numArray.sort();
console.log(numArray);








//reverse the all element of the first index is the last index
numArray.reverse();
console.log(numArray);


//sorting the array but retun the new Array 
const sorted = numArray.toSorted();
console.log(sorted);


// same as the reverse return the new array
const months = ["Jan", "Feb", "Mar", "Apr"];
const reversed = months.toReversed();
console.log(reversed)



//---------------numerical sort-------------


//numerical sort
const num = [23,4,6,4,334,5,50,66];

num.sort(function(a,b){
    return a-b;
})
console.log(num);



//find the min Element 
 let minElement = Math.min.apply(null,num);

 console.log(minElement);
 


//find the max Element 
let maxElement = Math.max.apply(null,num);

console.log(maxElement);



