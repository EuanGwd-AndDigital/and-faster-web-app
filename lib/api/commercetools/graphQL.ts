import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from "@commercetools/platform-sdk";

import { getClient, getProjectKey } from "./client";

export const graphQLClient = async (query: string, variables = {}) => {
  const client = await getClient();
  const projectKey = await getProjectKey();

  const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);

  return apiRoot
    .withProjectKey({ projectKey })
    .graphql()
    .post({
      body: {
        query,
        variables,
      },
    })
    .execute();
};
