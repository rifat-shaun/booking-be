"use client";
import { useGetBookingQuery } from "@/redux/features/booking/bookingApiSlice";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("trnOrderNumber");
    const bookingDate = searchParams.get("trnDate");

    const { data: bookingData } = useGetBookingQuery({
        order_number: orderId,
      }) as any;

  const orderDetails = bookingData ? bookingData?.data : {};

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-2 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Payment Successfull
          </h1>
          <p className="text-gray-700 mb-6">
            Your payment has been processed. We have emailed you details of your
            order.
          </p>
          <div className="text-left mb-6">
            <p>
              <strong>Order number:</strong> #{orderDetails?.order_number}
            </p>
            <p>
              <strong>Booking type:</strong> {orderDetails?.package?.name}
            </p>
            <p>
              <strong>Total seat:</strong> {orderDetails?.total_guests}
            </p>
            {/* <p>
              <strong>Booking date:</strong> {bookingDate}
            </p> */}
            <p>
              <strong>Total amount:</strong> ${orderDetails?.total_price}
            </p>
            <p>
              <strong>Transaction date:</strong> {bookingDate}
            </p>
          </div>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
            Go to Home
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default PaymentSuccess;
