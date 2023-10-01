import { apiSlice } from "./apiSlice";
const TASKS_URL = "api/v1/tasks";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      createTask: builder.mutation({
        query: (data) => {
          return {
            url: `${TASKS_URL}/`, 
            method: 'POST',
            body: data
          }
        }
      })
    }
  }
})

export const { useCreateTaskMutation } = tasksApiSlice;