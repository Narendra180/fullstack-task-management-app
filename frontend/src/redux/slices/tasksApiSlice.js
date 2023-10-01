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
      }),
      getAllTasks: builder.query({
        query: () => {
          return {
            url: `${TASKS_URL}`
          }
        }
      }),
      updateTask: builder.mutation({
        query: (data) => {
          const url = `${TASKS_URL}/${data["_id"]}`;
          delete data["_id"];
          return {
            url, 
            method: 'PUT',
            body: data
          }
        }
      }),
      deleteTask: builder.mutation({
        query: (data) => {
          return {
            url: `${TASKS_URL}/${data["_id"]}`,
            method: 'DELETE'
          }
        }
      })
    }
  }
})

export const { 
                useCreateTaskMutation, 
                useGetAllTasksQuery, 
                useUpdateTaskMutation,
                useDeleteTaskMutation
              } = tasksApiSlice;