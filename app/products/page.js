import { Suspense } from 'react';

import { wait, error } from '@/utils';
import Categories from '@/components/Categories';
import ProductsList from '@/components/ProductsList';
import ListSkeleton from '@/components/ListSkeleton';

const Page = async ({ searchParams }) => {
  console.log('Hello from products page');
  
  const { category } = await searchParams;

  // await wait(1000);

  // error();

  return (
    <>
      <Categories />
      <Suspense key={category} fallback={<ListSkeleton />}>
        <ProductsList searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default Page;
