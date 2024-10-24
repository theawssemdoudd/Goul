import Link from 'next/link';

import { wait, error } from '@/utils';
import Categories from '@/components/Categories';

const Page = async ({ searchParams }) => {
  console.log('Hello from products page');
  
  const { category } = await searchParams;
  const response = await fetch(category
    ? `https://fakestoreapi.com/products/category/${category}` 
    : 'https://fakestoreapi.com/products'
  );
  const products = await response.json();

  // await wait(1000);

  // error();

  return (
    <>
      <Categories />
      <ul>
        { products.map(product => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.title} - {product.price}€
            </Link>
          </li>
        )) }
      </ul>
    </>
  );
}

export default Page;
