import { graphQLClient } from "../graphQL";
import { getPagedProducts } from "./pagedProducts";
jest.mock("../graphQL");

describe("PageProduct Testing", () => {
  test("It should return pagedProducts", async () => {
    const mockPagedProduct = {
      body: {
        data: {
          products: {
            results: [
              {
                id: "1",
                masterData: {
                  current: {
                    name: "Prometheus Female shoes",
                    slug: "prometheus-female-shoes",
                  },
                },
              },
            ],
          },
        },
      },
    };
    (graphQLClient as jest.Mock).mockResolvedValue(mockPagedProduct);
    const pagedProducts = await getPagedProducts();

    const product = [
      {
        id: "1",
        masterData: {
          current: {
            name: "Prometheus Female shoes",
            slug: "prometheus-female-shoes",
          },
        },
      },
    ];

    expect(pagedProducts).toEqual(product);
  });
});
