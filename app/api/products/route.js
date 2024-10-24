export const GET = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
 
  return Response.json(products);
}
