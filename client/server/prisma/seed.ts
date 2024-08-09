import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        name: 'Mujtaba',
        email: 'mujtaba.shafique12@gmail.com',
        password: 'mujtaba',
        phone: '+920000000',
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith12@example.com',
        password: 'password456',
        phone: '987-654-3210',
      },
    ],
  });

  // Seed Categories
  await prisma.categories.createMany({
    data: [
      {
        name: 'Electronic',
        posterImageUrl: 'https://example.com/electronics.jpg',
        posterImagePublicId: 'electronics_img',
      },
      {
        name: 'Furnitures',
        posterImageUrl: 'https://example.com/furniture.jpg',
        posterImagePublicId: 'furniture_img',
      },
    ],
  });

  // Retrieve category IDs
  const categories = await prisma.categories.findMany({
    select: { id: true, name: true },
  });

  // Seed Products
  await prisma.products.createMany({
    data: [
      {
        name: 'Smartphone',
        price: 699,
        description: 'A high-end smartphone with 128GB storage.',
        stock: 50,
        discountPrice: 649,
        posterImageUrl: 'https://example.com/smartphone.jpg',
        posterImagePublicId: 'smartphone_img',
        hoverImageUrl: 'https://example.com/smartphone_hover.jpg',
        hoverImagePublicId: 'smartphone_hover_img',
        productImages: [
          { public_id: 'abc', imageUrl: 'https://example.com/smartphone1.jpg' },
          { public_id: 'def', imageUrl: 'https://example.com/smartphone2.jpg' },
        ],
        additionalInformation: [
          { key: 'Colors', value: 'red, blue' },
          { key: 'Dimension', value: '10x10, 20x20' },
        ],
        categoriesId: categories.find((cat) => cat.name === 'Electronics')?.id,
      },
      {
        name: 'Sofa',
        price: 899,
        description: 'A comfortable 3-seater sofa.',
        stock: 20,
        discountPrice: 799,
        posterImageUrl: 'https://example.com/sofa.jpg',
        posterImagePublicId: 'sofa_img',
        hoverImageUrl: 'https://example.com/sofa_hover.jpg',
        hoverImagePublicId: 'sofa_hover_img',
        productImages: [
          { public_id: 'ghi', imageUrl: 'https://example.com/sofa1.jpg' },
          { public_id: 'jkl', imageUrl: 'https://example.com/sofa2.jpg' },
        ],
        additionalInformation: [
          { key: 'Colors', value: 'red, blue' },
          { key: 'Dimension', value: '10x10, 20x20' },
        ],
        categoriesId: categories.find((cat) => cat.name === 'Furniture')?.id,
      },
    ],
  });

  // Seed Reviews
  await prisma.reviews.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        review: 'Great smartphone with excellent features!',
        star: 5,
        productId: (
          await prisma.products.findFirst({ where: { name: 'Smartphone' } })
        )?.id,
      },
      {
        name: 'Bob Williams',
        email: 'bob.williams@example.com',
        review: 'The sofa is very comfortable and stylish.',
        star: 4,
        productId: (
          await prisma.products.findFirst({ where: { name: 'Sofa' } })
        )?.id,
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
