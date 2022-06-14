import {
  ClientBuilder,
  AuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

import fetch from "cross-fetch";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const getProjectKey = async () => {
  const CTP_PROJECT_KEY = process.env.CTP_PROJECT_KEY as string;
  return CTP_PROJECT_KEY;
};

const httpMiddlewareOptions = (CTP_API_URL: string) => ({
  host: CTP_API_URL,
  fetch,
});

const authMiddlewareOptions = (
  CTP_AUTH_URL: string,
  CTP_PROJECT_KEY: string,
  CTP_CLIENT_ID: string,
  CTP_CLIENT_SECRET: string,
  CTP_SCOPES: string
): AuthMiddlewareOptions => ({
  host: CTP_AUTH_URL,
  projectKey: CTP_PROJECT_KEY,
  credentials: {
    clientId: CTP_CLIENT_ID,
    clientSecret: CTP_CLIENT_SECRET,
  },
  scopes: [CTP_SCOPES],
  fetch,
});

export const getClient = async () => {
  const projectKey = await getProjectKey();
  const [
    CTP_CLIENT_SECRET,
    CTP_CLIENT_ID,
    CTP_AUTH_URL,
    CTP_SCOPES,
    CTP_API_URL,
  ]: string[] = [
    process.env.CTP_CLIENT_SECRET as string,
    process.env.CTP_CLIENT_ID as string,
    process.env.CTP_AUTH_URL as string,
    process.env.CTP_SCOPES as string,
    process.env.CTP_API_URL as string,
  ];

  return new ClientBuilder()
    .withAnonymousSessionFlow(
      authMiddlewareOptions(
        CTP_AUTH_URL,
        projectKey,
        CTP_CLIENT_ID,
        CTP_CLIENT_SECRET,
        CTP_SCOPES
      )
    )
    .withHttpMiddleware(httpMiddlewareOptions(CTP_API_URL))
    .build();
};
