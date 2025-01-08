
const numberArr = [5,4,2,63,8,96,3];

numberArr.forEach(printAllElement);

function printAllElement(value,index,array){
        console.log(value);
        // console.log(array[index]);
        // console.log(array);
}


//map return the new array
let newNumArr = numberArr.map(add);

function add(value,index,array){
    return value+10;
    // return [value,value+10];
}
console.log(newNumArr)



// use the map of the all element and add the vlaue of the array 

let flatNumArr = numberArr.flatMap(sum);

function sum(value){
    return [value,value+10];
}
console.log(flatNumArr)



//return the new array the setified the condition

fliterArr = numberArr.filter((el)=>(el>10));

console.log(fliterArr);


//use to the all iteration or the store the previouse value in accumelator 
let reduceValue = numberArr.reduce((acc,el) => {
    return acc+ el
},0)

console.log(reduceValue);


//use to the all iteration right to left or the store the previouse value in accumelator 
let reduceRightValue = numberArr.reduceRight((acc,el) => {
    return acc+ el
},0)

console.log(reduceRightValue);



//check the every element the should the condition has sastifaed then return true, either retun false; then return the sigle value 
let check = numberArr.every((el)=>(el>10));
console.log(check);


//some element condition sastified then the retun true
let checkSome = numberArr.some((el)=>(el>10));
console.log(checkSome);


