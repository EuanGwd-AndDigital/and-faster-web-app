import { graphQLClient } from "./graphQL";
import { getClient, getProjectKey } from "./client";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
jest.mock("@commercetools/platform-sdk");
jest.mock("./client");

describe("Commercetools GraphQL Client test", () => {
  test("Functions should be called", async () => {
    const APIRootMock = {
      withProjectKey: jest.fn(({}: any) => {
        return {
          graphql: jest.fn(() => {
            return {
              post: jest.fn(({}: any) => {
                return {
                  execute: jest.fn(),
                };
              }),
            };
          }),
        };
      }),
    };

    (getProjectKey as jest.Mock).mockResolvedValue("PROJECT_KEY");
    (getClient as jest.Mock).mockResolvedValue("");

    (createApiBuilderFromCtpClient as jest.Mock).mockReturnValue(APIRootMock);

    await graphQLClient("queryString");

    //getProjectKey is called
    const withProjectKeyMock = APIRootMock.withProjectKey.mock;
    expect(withProjectKeyMock.calls.length).toBe(1);

    //expect to be called with projectKey
    expect(withProjectKeyMock.calls[0][0]).toEqual({
      projectKey: "PROJECT_KEY",
    });

    //graphql is called
    const graphqlMock = withProjectKeyMock.results[0].value.graphql.mock;
    expect(graphqlMock.calls.length).toBe(1);

    //post is called
    const postMock = graphqlMock.results[0].value.post.mock;
    expect(postMock.calls.length).toBe(1);

    //expect to be called with post body
    expect(postMock.calls[0][0]).toEqual({
      body: { query: "queryString", variables: {} },
    });

    //execute is called
    const executeMock = postMock.results[0].value.execute.mock;
    expect(executeMock.calls.length).toBe(1);
  });
});
