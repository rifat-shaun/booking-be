import { api } from "../api/apiSlice";

const bookingSliceTag = api.enhanceEndpoints({
  addTagTypes: ["Booking"],
});

const bookingApiSlice = bookingSliceTag.injectEndpoints({
  endpoints: (builder: any) => ({
    getBooking: builder.query({
      query: (arg: {order_number: string}) => `booking?order_number=${arg.order_number}`,
      providesTags: ["Booking"],
    }),
    addBooking: builder.mutation({
      query: (data: any) => ({
        url: `booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetBookingQuery, useAddBookingMutation } = bookingApiSlice;
