import { apiSlice } from "./apiSlice";
const USERS_URL = "api/v1/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => {
          return {
            url: `${USERS_URL}/auth`, 
            method: 'POST',
            body: data
          }
        }
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: `${USERS_URL}/logout`,
            method: 'POST'
          }
        }
      }),
      register: builder.mutation({
        query: (data) => {
          return {
            url: `${USERS_URL}/`,
            method: 'POST',
            body: data
          }
        }
      }),
      updateUser: builder.mutation({
        query: (data) => {
          return {
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data
          }
        }
      })
    }
  }
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice