console.log('chipopo');
const numbers = [1,2,3,4,5]
const products = [
    {
      id: "1",
      cat: "food",
      name: "Milk",
      price: "6",
      quantity: 2,
      image:
        "https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_150.jpg",
    },
    {
      id: "2",
      cat: "food",
      name: "Bread",
      price: "8",
      quantity: "2",
      image:
        "https://cdn.pixabay.com/photo/2014/07/22/09/59/bread-399286_150.jpg",
    },
    {
      id: "4",
      cat: "food",
      name: "Eggs",
      price: "12",
      quantity: "3",
      image: "https://cdn.pixabay.com/photo/2015/09/17/17/19/egg-944495_150.jpg",
    },
    {
      id: "3",
      cat: "clothing",
      name: "Coat",
      price: "120",
      quantity: 4,
      image:
        "https://cdn.pixabay.com/photo/2015/05/29/19/19/person-789663_150.jpg",
    },
    {
      id: "5",
      cat: "clothing",
      name: "Dress",
      price: "4000",
      quantity: 5,
      image:
        "https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dresses-1485984_150.jpg",
    },
    {
      id: "6",
      cat: "clothing",
      name: "Shirt",
      price: "70",
      quantity: 1,
      image:
        "https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328_150.jpg",
    },
    {
      id: "7",
      cat: "animals",
      name: "Dog food",
      price: "70",
      quantity: 1,
      image: "https://cdn.pixabay.com/photo/2017/04/07/10/53/dog-2210717_150.jpg",
    },
    {
      id: "8",
      cat: "animals",
      name: "Cat toy",
      price: "50",
      quantity: 1,
      image: "https://cdn.pixabay.com/photo/2018/07/21/09/17/cat-3552143_150.jpg",
    },
  ];
let sum = numbers.reduce((prev, current)=>{
    console.log(`Prev ${prev}, current ${current}`);
    return prev +current;
})
console.log(`Sum ${sum}`);
 sum = products.reduce((prev, current)=>{
    console.log(`Prev ${prev}, current price  ${current.price}, quantity ${current.quantity}`);
    return prev + (current.price *1 )* (current.quantity * 1);
},0)
console.log(`Sum ${sum}`); 