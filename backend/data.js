import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false,
    },
  ],
  products: [
    {
      prodname: 'Nope Not Today Hoodie',
      slug: 'nope-not-today-hoodie',
      img: '../images/man1.png',
      category: 'Men',
      desc: 'desc',
      price: 1150,
      stock: 10,
      rating: 3.5,
      numReviews: 10,
    },
    {
      img: '../images/women1.png',
      prodname: 'Stiched Ladies Kurti',
      price: 595,
      numReviews: 5,
      rating: 2,
      slug: 'stitched-ladies-kurti',
      stock: 0,
      desc: 'desc',
      category: 'Women',
    },
    {
      img: '../images/kid1.png',
      prodname: 'Baby Suit Unisex',
      price: 750,
      numReviews: 5,
      rating: 3,
      slug: 'baby-suit-unisex',
      stock: 20,
      desc: 'desc',
      category: 'Kids',
    },
    {
      img: '../images/boot.png',
      prodname: 'Nylon Boot Predator',
      price: 13500,
      numReviews: 11,
      rating: 4.5,
      slug: 'nylon-boot-predator',
      stock: 20,
      desc: 'desc',
      category: 'Men',
    },
  ],
};

export default data;
