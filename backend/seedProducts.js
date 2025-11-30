// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Product = require("./models/Product");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const products = [
//   // --- MEN'S CLOTHING ---
//   {
//     name: "Classic White T-Shirt",
//     description:
//       "A staple for every wardrobe. Made from 100% organic cotton. Breathable and durable.",
//     price: 2199,
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//     stock: 50,
//   },
//   {
//     name: "Slim Fit Denim Jeans",
//     description:
//       "Dark wash denim jeans with a modern slim fit cut. Stretchy and comfortable.",
//     price: 5499,
//     image:
//       "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["M", "L", "XL"],
//     stock: 30,
//   },
//   {
//     name: "Men's Leather Bomber Jacket",
//     description:
//       "Premium faux leather jacket. Perfect for winter and autumn evenings. Stylish and warm.",
//     price: 9999,
//     image:
//       "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["L", "XL"],
//     stock: 15,
//   },
//   {
//     name: "Casual Chino Shorts",
//     description:
//       "Beige chino shorts ideal for summer beach days. Light and airy.",
//     price: 2999,
//     image:
//       "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["S", "M"],
//     stock: 40,
//   },
//   {
//     name: "Formal Business Suit",
//     description:
//       "Charcoal grey business suit. Includes blazer and trousers. Wool blend.",
//     price: 21999,
//     image:
//       "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["M", "L", "XL"],
//     stock: 10,
//   },
//   {
//     name: "Graphic Streetwear Hoodie",
//     description:
//       "Oversized hoodie with urban graphic print. Heavyweight cotton fleece.",
//     price: 6999,
//     image:
//       "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//     stock: 25,
//   },
//   {
//     name: "Men's Flannel Shirt",
//     description: "Red and black checkered flannel shirt. Great for layering.",
//     price: 3999,
//     image:
//       "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["M", "L"],
//     stock: 35,
//   },
//   {
//     name: "Athletic Running Joggers",
//     description: "Moisture-wicking joggers for gym and running. Tapered fit.",
//     price: 3499,
//     image:
//       "https://images.unsplash.com/photo-1552160753-2e71246535cc?auto=format&fit=crop&w=800&q=80",
//     category: "Men",
//     sizes: ["S", "M", "L"],
//     stock: 60,
//   },

//   // --- WOMEN'S CLOTHING ---
//   {
//     name: "Floral Summer Dress",
//     description:
//       "Lightweight rayon dress with floral patterns. Perfect for hot summer days.",
//     price: 3999,
//     // REPLACED (Index 8)
//     image:
//       "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["S", "M", "L"],
//     stock: 40,
//   },
//   {
//     name: "High-Waist Skinny Jeans",
//     description:
//       "Black high-waisted jeans. Super stretch fabric for maximum comfort.",
//     price: 4999,
//     image:
//       "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//     stock: 45,
//   },
//   {
//     name: "Elegant Evening Gown",
//     description:
//       "Red satin evening gown for formal events. Floor-length and sleeveless.",
//     price: 15999,
//     image:
//       "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["S", "M"],
//     stock: 8,
//   },
//   {
//     name: "Oversized Knit Sweater",
//     description:
//       "Cozy chunky knit sweater in cream color. Warm winter essential.",
//     price: 4999,
//     image:
//       "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["M", "L", "XL"],
//     stock: 20,
//   },
//   {
//     name: "Office Pencil Skirt",
//     description:
//       "Navy blue pencil skirt for professional settings. Knee-length.",
//     price: 2999,
//     image:
//       "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["S", "M", "L"],
//     stock: 30,
//   },
//   {
//     name: "Women's Denim Jacket",
//     description: "Vintage wash denim jacket with button closure. Cropped fit.",
//     price: 6499,
//     image:
//       "https://images.unsplash.com/photo-1527448560064-a7491d96eb97?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["S", "M"],
//     stock: 25,
//   },
//   {
//     name: "Yoga Leggings",
//     description: "High-performance leggings for yoga and pilates. Squat-proof.",
//     price: 2499,
//     // REPLACED (Index 14)
//     image:
//       "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//     stock: 100,
//   },
//   {
//     name: "Silk Blouse",
//     description: "Luxurious white silk blouse. Soft texture and elegant drape.",
//     price: 7999,
//     image:
//       "https://images.unsplash.com/photo-1551163943-3f6a29e39454?auto=format&fit=crop&w=800&q=80",
//     category: "Women",
//     sizes: ["M", "L"],
//     stock: 15,
//   },

//   // --- KIDS' CLOTHING ---
//   {
//     name: "Kids Dinosaur T-Shirt",
//     description:
//       "Fun graphic print t-shirt. 100% cotton, safe for sensitive skin.",
//     price: 1299,
//     // REPLACED (Index 16)
//     image:
//       "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["S", "M", "L"],
//     stock: 60,
//   },
//   {
//     name: "Girls' Party Dress",
//     description: "Pink dress for birthdays and parties.",
//     price: 3499,
//     // REPLACED (Index 17)
//     image:
//       "https://images.unsplash.com/photo-1621452773781-0f992ee03591?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["S", "M"],
//     stock: 20,
//   },
//   {
//     name: "Boys' Denim Overalls",
//     description:
//       "Classic denim overalls with adjustable straps. Durable for play.",
//     price: 2999,
//     // (This was working, but updating to ensure distinctness)
//     image:
//       "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["S", "M", "L"],
//     stock: 30,
//   },
//   {
//     name: "Kids Winter Puffer Jacket",
//     description: "Bright warm puffer jacket. Water-resistant.",
//     price: 4999,
//     image:
//       "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["M", "L", "XL"],
//     stock: 25,
//   },
//   {
//     name: "School Uniform Polo",
//     description:
//       "Pack of 3 white polo shirts for school. Stain-resistant fabric.",
//     price: 2499,
//     image:
//       "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["S", "M", "L", "XL"],
//     stock: 100,
//   },
//   {
//     name: "Kids Pajama Set",
//     description: "Cotton pajama set with patterns. Long sleeve top and pants.",
//     price: 1799,
//     image:
//       "https://images.unsplash.com/photo-1514358892404-585a973db1d1?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["S", "M", "L"],
//     stock: 50,
//   },
//   {
//     name: "Kids Raincoat",
//     description: "Yellow raincoat with hood. 100% waterproof.",
//     price: 2499,
//     // REPLACED (Index 22)
//     image:
//       "https://images.unsplash.com/photo-1632168864757-376518174780?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["M", "L"],
//     stock: 15,
//   },
//   {
//     name: "Superhero Costume Hoodie",
//     description: "Zip-up hoodie with fun design.",
//     price: 3999,
//     // REPLACED (Likely user's Index 24)
//     image:
//       "https://images.unsplash.com/photo-1559535332-db9971090158?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["S", "M"],
//     stock: 10,
//   },
//   {
//     name: "Baby Onesie Pack",
//     description: "Pack of 5 cotton onesies. Pastel colors.",
//     price: 2199,
//     // REPLACED (Likely user's Index 25)
//     image:
//       "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
//     category: "Kids",
//     sizes: ["S"],
//     stock: 40,
//   },
// ];

// const importData = async () => {
//   try {
//     await Product.deleteMany();
//     await Product.insertMany(products);
//     console.log("Data Imported Successfully!");
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// importData();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const products = [
  // --- MEN'S CLOTHING ---
  {
    name: "Classic White T-Shirt",
    description:
      "A staple for every wardrobe. Made from 100% organic cotton. Breathable and durable.",
    price: 2199,
    image: "https://m.media-amazon.com/images/I/51NWJMxZ9uL._AC_UY1100_.jpg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Slim Fit Denim Jeans",
    description:
      "Dark wash denim jeans with a modern slim fit cut. Stretchy and comfortable.",
    price: 5499,
    image:
      "https://peplosjeans.in/cdn/shop/files/2_da39391c-d9a6-4b48-924d-ee7693b49b16.png?v=1709638498&width=1080",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 30,
  },
  {
    name: "Men's Leather Bomber Jacket",
    description:
      "Premium faux leather jacket. Perfect for winter and autumn evenings. Stylish and warm.",
    price: 9999,
    image:
      "https://www.voganow.com/cdn/shop/files/VNGJ-603-LU-01A_4_c9a747f6-572a-4a17-a281-0e201274889c.jpg?v=1752329836",
    category: "Men",
    sizes: ["L", "XL"],
    stock: 15,
  },
  {
    name: "Casual Chino Shorts",
    description:
      "Beige chino shorts ideal for summer beach days. Light and airy.",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/51czgGsNFZL._AC_UY1100_.jpg",
    category: "Men",
    sizes: ["S", "M"],
    stock: 40,
  },
  {
    name: "Formal Business Suit",
    description:
      "Charcoal grey business suit. Includes blazer and trousers. Wool blend.",
    price: 21999,
    image:
      "https://blackberrys.com/cdn/shop/files/Two_Piece_Grey_Solid_Formal_Suits_Connor-CP002085G1-image7.jpg?v=1722581291&width=1600",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 10,
  },
  {
    name: "Graphic Streetwear Hoodie",
    description:
      "Oversized hoodie with urban graphic print. Heavyweight cotton fleece.",
    price: 6999,
    image:
      "https://fastcolors.in/cdn/shop/files/Go_Weird_stylish_hoodies_for_men_Navy_Blue-62075-SSHNAVYBACK.jpg?v=1734705324&width=2048",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },
  {
    name: "Men's Flannel Shirt",
    description: "Red and black checkered flannel shirt. Great for layering.",
    price: 3999,
    image:
      "https://peplosjeans.in/cdn/shop/files/4_a6243e0d-a4a8-48db-bdc0-cd7145804101_1800x1800.jpg?v=1734509123",
    category: "Men",
    sizes: ["M", "L"],
    stock: 35,
  },
  {
    name: "Athletic Running Joggers",
    description: "Moisture-wicking joggers for gym and running. Tapered fit.",
    price: 3499,
    image:
      "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/30683113/2024/9/11/fbaa42ba-be82-4773-b3e1-aea75473320d1726032523881-New-Balance-Sport-Essentials-Woven-Jogger-4281726032523425-1.jpg",
    category: "Men",
    sizes: ["S", "M", "L"],
    stock: 60,
  },

  // --- WOMEN'S CLOTHING ---
  {
    name: "Floral Summer Dress",
    description:
      "Lightweight rayon dress with floral patterns. Perfect for hot summer days.",
    price: 3999,
    // REPLACED (Index 8)
    image:
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/e/4/e4eb86825W1036_1.jpg?tr=w-512",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 40,
  },
  {
    name: "High-Waist Skinny Jeans",
    description:
      "Black high-waisted jeans. Super stretch fabric for maximum comfort.",
    price: 4999,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUHXMIKL668G_BD7BjJdLP7k-auPQS0n4OA&s",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 45,
  },
  {
    name: "Elegant Evening Gown",
    description:
      "Red satin evening gown for formal events. Floor-length and sleeveless.",
    price: 15999,
    image:
      "https://i.pinimg.com/736x/62/e9/b1/62e9b19dc33ebc866fd834875df093c1.jpg",
    category: "Women",
    sizes: ["S", "M"],
    stock: 8,
  },
  {
    name: "Oversized Knit Sweater",
    description:
      "Cozy chunky knit sweater in cream color. Warm winter essential.",
    price: 4999,
    image:
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/0/80941d9CCC-CD20240927559695KS-Red_1.jpg?tr=w-512",
    category: "Women",
    sizes: ["M", "L", "XL"],
    stock: 20,
  },
  {
    name: "Office Pencil Skirt",
    description:
      "Navy blue pencil skirt for professional settings. Knee-length.",
    price: 2999,
    image:
      "https://images.meesho.com/images/products/544416187/rnauw_512.webp?width=512",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 30,
  },
  {
    name: "Women's Denim Jacket",
    description: "Vintage wash denim jacket with button closure. Cropped fit.",
    price: 6499,
    image: "https://m.media-amazon.com/images/I/81HRDsfEKUL._AC_UY1100_.jpg",
    category: "Women",
    sizes: ["S", "M"],
    stock: 25,
  },
  {
    name: "Yoga Leggings",
    description: "High-performance leggings for yoga and pilates. Squat-proof.",
    price: 2499,
    // REPLACED (Index 14)
    image:
      "https://hips.hearstapps.com/hmg-prod/images/best-yoga-leggings-women-65e6f94e3f2d4.png?crop=0.404xw:0.808xh;0.579xw,0.0737xh&resize=1200:*",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Silk Blouse",
    description: "Luxurious white silk blouse. Soft texture and elegant drape.",
    price: 7999,
    image:
      "https://www.luxurionworld.com/cdn/shop/files/PB1P324011301_Yellow_Digital_Printed_Patola_Design_Tussar_Silk_Blouse_1.jpg?v=1705133203&width=1445",
    category: "Women",
    sizes: ["M", "L"],
    stock: 15,
  },

  // --- KIDS' CLOTHING ---
  {
    name: "Kids Dinosaur T-Shirt",
    description:
      "Fun graphic print t-shirt. 100% cotton, safe for sensitive skin.",
    price: 1299,
    // REPLACED (Index 16)
    image:
      "https://i.etsystatic.com/21135129/r/il/4456cc/6694641461/il_570xN.6694641461_r4u2.jpg",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 60,
  },
  {
    name: "Girls' Party Dress",
    description: "Pink dress for birthdays and parties.",
    price: 3499,
    // REPLACED (Index 17)
    image:
      "https://www.foreverkidz.in/cdn/shop/files/Blushing_Pink_Party_Dress-5015016.jpg?crop=center&height=2100&v=1746014765&width=1500",
    category: "Kids",
    sizes: ["S", "M"],
    stock: 20,
  },
  {
    name: "Boys' Denim Overalls",
    description:
      "Classic denim overalls with adjustable straps. Durable for play.",
    price: 2999,
    // (This was working, but updating to ensure distinctness)
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWlW5k_SwPHs6CWXVkmm3HANZ3eQPYJbA1Dw&s",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 30,
  },
  {
    name: "Kids Winter Puffer Jacket",
    description: "Bright warm puffer jacket. Water-resistant.",
    price: 4999,
    image: "https://janandjul.com/wp-content/uploads/ICP-WBR-1-1.jpg",
    category: "Kids",
    sizes: ["M", "L", "XL"],
    stock: 25,
  },
  {
    name: "School Uniform Polo",
    description:
      "Pack of 3 white polo shirts for school. Stain-resistant fabric.",
    price: 2499,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/11/BP/RM/ZS/103321530/school-polo-shirts-500x500.jpg",
    category: "Kids",
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Kids Pajama Set",
    description: "Cotton pajama set with patterns. Long sleeve top and pants.",
    price: 1799,
    image:
      "https://www.momshome.in/cdn/shop/files/LIONSLEEPSUIT_1_1200x.jpg?v=1716813076",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 50,
  },
  {
    name: "Kids Raincoat",
    description: "Yellow raincoat with hood. 100% waterproof.",
    price: 2499,
    // REPLACED (Index 22)
    image:
      "https://www.allextreme.in/media/catalog/product/b/0/b0d9h562nn_1.jpg",
    category: "Kids",
    sizes: ["M", "L"],
    stock: 15,
  },
  {
    name: "Superhero Costume Hoodie",
    description: "Zip-up hoodie with fun design.",
    price: 3999,
    // REPLACED (Likely user's Index 24)
    image: "https://images-na.ssl-images-amazon.com/images/I/417IUp0jNeL.jpg",
    category: "Kids",
    sizes: ["S", "M"],
    stock: 10,
  },
  {
    name: "Baby Onesie Pack",
    description: "Pack of 5 cotton onesies. Pastel colors.",
    price: 2199,
    // REPLACED (Likely user's Index 25)
    image:
      "https://i5.walmartimages.com/seo/Gerber-Baby-Girl-Short-Sleeve-Onesie-Bodysuits-5-Pack-Preemie-24-Months_00c14e23-6b5c-42b0-ba33-c5796df907e5_1.faa30e29c6b5c4cdfbc107f9f600d9d2.jpeg",
    category: "Kids",
    sizes: ["S"],
    stock: 40,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
