export async function generateStaticParams () {
  const response = await fetch(`https://fakestoreapi.com/products`);
  const products = await response.json();

  return products.map(product => ({
    id: product.id.toString()
  }));
}

const Products = async ({ params }) => {
  const { id } = await params;
  let product;
  
  try {
    const response = await fetch(`https://fakestoreapi.com/products/` + id);
    product = await response.json();
  } catch(e) {}

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <h3>{product.title}</h3>
      <p>{product.price}€</p>
    </>
  );
}

export default Products;
