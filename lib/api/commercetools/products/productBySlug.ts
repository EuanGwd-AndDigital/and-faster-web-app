import { graphQLClient } from "../graphQL";
import { ProductQuery } from "../queries/productQuery";

export const getProductBySlug = async (productSlug: string | string[]) => {
  const productData = await graphQLClient(ProductQuery(productSlug));

  const {
    body: {
      data: {
        products: { results },
      },
    },
  } = productData;

  return results[0] ? results[0] : null;
}
