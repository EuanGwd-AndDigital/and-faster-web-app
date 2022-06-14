import React from 'react';
import { Product } from '@commercetools/platform-sdk';
import { getPagedProducts } from '../lib/api/commercetools/products/pagedProducts';

export default function App({ products }: any) {
  return (
    <>
      <h1>Home page</h1>
      {products.map((product: Product) => {
        return (
          <div key={product.id}>
            <p>{product.id}</p>
            <p>{product.masterData.current.name}</p>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data
  const products = await getPagedProducts();

  // Pass data to the page via props
  return { props: { products } };
}
