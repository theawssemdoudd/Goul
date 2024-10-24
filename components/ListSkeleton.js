const ListSkeleton = () => (
  <ul>
    { Array.from({ length: 20 }).map((_, index) => (
      <li className="skeleton-list-item" key={index}></li>
    )) }
  </ul>
);

export default ListSkeleton;