import { wait, error } from '@/utils';
import Categories from '@/components/Categories';
import ProductsList from '@/components/ProductsList';

const Page = async ({ searchParams }) => {
  console.log('Hello from products page');

  // await wait(1000);

  // error();

  return (
    <>
      <Categories />
      <ProductsList searchParams={searchParams} />
    </>
  );
}

export default Page;
