import React from "react";
import { Product } from "@commercetools/platform-sdk";
import Image from 'next/image'
import { NextApiRequest } from "next";
import { getProductBySlug } from "../../lib/api/commercetools/products/productBySlug";

type Props = {
  product: Product;
} 

export default function ProductDetailsPage({product}: Props) {
  if (!product.masterData.current.masterVariant.price) throw new Error('Price not found');

  const {
    masterData: {
      current: {
        name: mainProductName,
        masterVariant: {
          attributes,
          price: {
            value: { centAmount },
          },
          images: mainImages,
        },
      },
    },
  } = product;

  const mainProductPrice = centAmount * 100;
  
  const mainProductDesigner =
    attributes &&
    attributes.reduce((previous: string, current: Record<string, any>) => {
      if (current.name === "designer") {
        const value = current.value.label;
        return previous.concat(value);
      } else {
        return previous.concat("");
      }
    }, "");

  return (
    <div>
      <p>Product details page: {mainProductName}</p>
      <p> Brand: {mainProductDesigner} </p>
      <p> Price: {mainProductPrice} </p>
      <p> Image: {
      mainImages ? 
      <Image 
        src={mainImages[0].url} 
        alt={mainImages[0].label} 
        height={200}
        width={200}
      /> : 
      null
      } </p>
      <hr></hr>
    </div>
  );
}

export async function getServerSideProps(context: NextApiRequest) {
  const productSlug = context.query.slug;
  const product: Product = await getProductBySlug(productSlug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
