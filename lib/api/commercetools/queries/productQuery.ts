export const ProductQuery = (slug: string | string[]) => `
  query GetProduct {
    products(where: "masterData(current(slug(en=\\"${slug}\\")))") {  
      results {
        masterData {
          current {
            slug(locale: "en")
            name(locale: "en")
            masterVariant {
              attributes: attributesRaw {
                name
                value
              }
              price(currency: "EUR") {
                value {
                  centAmount
                }
              }
              images {
                url
                dimensions {
                  height
                  width
                }
                label
              }
            }
          }
        }
      }
    }
  }
`
