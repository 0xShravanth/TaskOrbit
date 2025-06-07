import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import reducer from ".";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.Next_PUBLIC_API_Base_URL,
  }),
  reducerPath: "api",
  tagTypes: [""],
  endpoints: (build) => ({}),
});

export const {} = api;
