import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    //get all blogs api function
    getAllBlogs: builder.mutation({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
    }),

    //get single blog by id api function
    getBlogsById: builder.mutation({
      query: (payload) => ({
        url: `/blogs/${payload}`,
        method: "GET",
      }),
    }),

    //create new blog api function
    createNewBlog: builder.mutation({
      query: (payload) => ({
        url: "/blogs",
        method: "POST",
        body: payload,
        credentials: true,
      }),
    }),
  }),
});

export const {
  useGetAllBlogsMutation,
  useGetBlogsByIdMutation,
  useCreateNewBlogMutation,
} = blogApi;
