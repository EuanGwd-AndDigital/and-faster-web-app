import { graphQLClient } from "../graphQL";

const pagedProducts = () => {
  return `
    query GetPagedProducts($limit: Int, $offset: Int) {
      products(limit: $limit, offset: $offset) {
        results {
          id
          masterData {
            current {
              name(locale: "en")
              slug(locale: "en")
            }
          }
        }
        offset
        count
        total
      }
    }
  `;
};

export const getPagedProducts = async (page = 1, perPage = 20) => {
  try {
    const offset: number = (page - 1) * perPage;

    const productData = await graphQLClient(pagedProducts(), {
      limit: perPage,
      offset,
    });
    const products = productData.body.data.products.results;
    return products;
  } catch (error) {
    return error;
  }
};
