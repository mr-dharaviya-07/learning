


const arr = ["one","two","three","four"]


// find the length
console.log(arr.length);

// converting the string
console.log(arr.toString());

// find the index location
console.log(arr.at(2));

// join the element to the using "*";
console.log(arr.join("*"));

//remove the last element
arr.pop();
console.log(arr);

//add the element on the last
arr.push("four");
console.log(arr);


//remove the element form the first
arr.shift()
console.log(arr);

//add the element to start the array
arr.unshift("One");
console.log(arr);

// delete the element and create the empty space on the index value
delete arr[0];
console.log(arr);

//combine two array
const arr2 = ["Five","Six","Seven"];
const arr3 = arr.concat(arr2);
console.log(arr3);

//copy the element value

arr[0] = "One";
arr.push("Five");
arr.push("Six");
console.log(arr);
arr.copyWithin(2,0);
console.log(arr);



//copy the elemnt for the spacifice index value
arr[2] = "Three";
arr[3] = "Four";
arr[4] = "Five";
arr[5] = "Six";

// arr.push("Five");
// arr.push("Six");
arr.copyWithin(2,0,2);
console.log(arr);

// remove the subArray and return the one array
const newArr = [[1,2],[3,4,5],[6,7,8]];
const flatArr = newArr.flat()
console.log(flatArr);

// iterated the all vlaue of the array;
const flatMapArr = flatArr.flatMap((el)=>(el = 10*el));
console.log(flatMapArr);


//add the element of the  position "2" and remove the element 0;
arr.splice(2,0,"Eight","nine","Ten");
console.log(arr);


//return the new arr and splice the array
const arr4 = ["one","two","three","four"];
const newArr4 = arr4.toSpliced(0,2);
console.log(newArr4);
console.log(arr4);


//return the new array of slice
const sliceArr4 = arr4.slice(0,2);
console.log(sliceArr4);


//-------------------Searching Method----------------------




//-------------------Shorting Method----------------------//





//--------------Array Iteration Method-------------------------//

