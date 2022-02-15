const a = "sadfdsfsdfsdfs";
const b = "sdfadfadsfdgfhghsfhdghdfhggf";
let arr1 = [];
let arr2 = [];
const n = 4;
arr1 = splitToSubstrings(a, n);
arr2 = splitToSubstrings(b, n);
let i = 0;
let arr3 = [];
function splitToSubstrings(str, n) {
  const arr = [];
  for (let index = 0; index < str.length; index += n) {
    arr.push(str.slice(index, index + n));
  }

  return arr;
}

function newstring(arr1, arr2, n) {
  if (a.length > b.length) {
    for (i = 0; i < arr1.length - 1; i++) {
      if (i < arr2.length - 1) {
        arr3.push(arr1[i]);
        arr3.push(arr2[i]);
      } else {
        arr3.push(arr1[i]);
      }
    }
  } else {
    for (i = 0; i < arr1.length - 1; i++) {
      if (i < arr1.length - 1) {
        arr3.push(arr1[i]);
        arr3.push(arr2[i]);
      } else {
        arr3.push(arr2[i]);
      }
    }
  }
}

newstring(arr1, arr2, n);
console.log(arr1);
console.log(arr2);
console.log(arr3);
arr3 = arr3.join("");
console.log(arr3);

const items = [
  { name: "bike", price: 123 },
  { name: "be", price: 1233 },
  { name: "ke", price: 13 },
  { name: "ke", price: 1 },
  { name: "bike", price: 23 },
  { name: "bike", price: 1123 },
  { name: "bike", price: 143 },
];
const filter = items.filter((item) => {
  return item.price <= 100;
});
const map = items.map((item) => {
  return item.name;
});
const price = items.map((item) => {
  return item.price;
});
const find = items.find((item) => {
  return item.price === 123;
});
items.forEach((item) => {
  console.log(item.price);
});
const hasin = items.some((item) => {
  return item.price <= 100;
});
const every = items.every((item) => {
  return item.price <= 100;
});

const totalprice = items.reduce((currenttotal, item) => {
  return item.price + currenttotal;
}, 0);
const item = [2, 2, 3, 4, 6, 5, 43, 2, 8];
const includes = item.includes(8);
console.log(includes);
console.log(totalprice);
console.log(every);
console.log(hasin);
console.log(find);
console.log(map);
console.log(filter);
console.log(price);
