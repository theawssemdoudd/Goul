'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const CategoriesSelect = ({ categories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChange = event => {
    const params = new URLSearchParams(searchParams);
    const category = event.target.value;
    
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    router.push(`?${params.toString()}`, { scroll: false });
    location.reload();
  }

  return (
    <div>
      <select onChange={onChange} value={searchParams.get('category') || ''}>
        <option value="">Toutes les catégories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  )
};

export default CategoriesSelect;