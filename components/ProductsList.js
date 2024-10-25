import Link from 'next/link';

const ProductsList = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  
  return (
    <ul>
      { products.map(product => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>
            {product.title} - {product.price}€
          </Link>
        </li>
      )) }
    </ul>
  )
};

export default ProductsList;