import CategoriesSelect from './CategoriesSelect';

const Categories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  const categories = await response.json();

  return <CategoriesSelect categories={categories} />
}

export default Categories;