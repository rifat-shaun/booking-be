"use client";

import {
  useGetEndLocationQuery,
  useGetStartLocationQuery,
} from "@/redux/features/location/locationApiSlice";
import { IPackage } from "@/type";
import { useState } from "react";
import ToCollapsible from "@/components/ToCollapsed";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FromCollapsible from "./FromCollapsed";
import { Button } from "./ui/button";
import { FaMinus, FaPlus, FaUser } from "react-icons/fa6";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import {
  useGetSingleAdultPriceQuery,
  useGetSingleChildPriceQuery,
} from "@/redux/features/price/priceApiSlice";
import { useGetGuestQuery } from "@/redux/features/guest/guestApiSlice";
import { useGetUserDetailsQuery } from "@/redux/authApiSlice";
import UserInfoForm from "./UserInfoForm";
import { useAddBookingMutation } from "@/redux/features/booking/bookingApiSlice";

export default function Calendars({ packages }: { packages: IPackage }) {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [child_guest_id, setChildGuestId] = useState("");
  const [adult_guest_id, setAdultGuestId] = useState("");
  const child = useSearchParams().get("sub_package");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location_id, setLocationId] = useState({
    start_point_id: "",
    end_point_id: "",
  });
  const [isInfant, setIsInfant] = useState(false);
  const [userInfo, setUserInfo] = useState({} as any);
  const { push } = useRouter();
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const getSubPackages = packages.child_packages?.find(
    (item: any) => item.name === child
  );
  const { data: guest } = useGetGuestQuery("") as any;
  const guests = guest?.data;
  const { data: startPoint } = useGetStartLocationQuery("") as any;
  const startLocations = startPoint?.data;
  const { data: endPoint } = useGetEndLocationQuery("") as any;
  const endLocations = endPoint?.data;

  const { data: adultData } = useGetSingleAdultPriceQuery({
    package_id: packages.id,
    guest_id: adult_guest_id,
    start_point_id: location_id?.start_point_id,
    end_point_id: location_id?.end_point_id,
  }) as any;

  const { data: childData } = useGetSingleChildPriceQuery({
    package_id: packages.id,
    guest_id: child_guest_id,
    start_point_id: location_id?.start_point_id,
    end_point_id: location_id?.end_point_id,
  }) as any;

  const childPrice = childCount ? childData?.data?.price : 0;
  const adultPrice = adultCount ? adultData?.data?.price : 0;
  const [addBooking] = useAddBookingMutation();
  const handleBooking = async () => {
    const booking = {
      adult_guest: adultCount,
      child_guest: childCount,
      infant_guest: infantCount,
      package_id: packages.id,
      start_point: start,
      end_point: end,
      date: new Date(selectedDate).toISOString().split("T")[0],
      totalAmount:
        ((adultCount * adultPrice + childCount * childPrice) * 5) / 100,
      user: userInfo,
    };
    const bookings = (await addBooking(booking)) as any;
    push(bookings.data.url);
  };

  return (
    <div className="row justify-center">
      <div className="col-12 space-y-5">
        {/* Booking Form Section Title */}
        <div className="w-full  h-16 flex flex-col items-center justify-center  text-cyan-500 border-b-2 border-cyan-500 font-bold">
          <h1 className="text-2xl">Booking Form</h1>
        </div>

        {/* Calender with Input form */}
        <div className="flex flex-col gap-10 w-full">
          {/* "From - To" input form */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FromCollapsible
              label="From"
              locations={startLocations}
              setStart={setStart}
              start={start}
              setLocationId={setLocationId}
              locationId={location_id}
            />

            <ToCollapsible
              label="To"
              locations={endLocations}
              start={start}
              setEnd={setEnd}
              end={end}
              setLocationId={setLocationId}
              locationId={location_id}
            />
          </div>

          {/* Calender Container */}
          <div className="space-y-3 text-left">
            <h3 className="px-2 font-bold text-gray-700">Select Date</h3>
            <Calendar
              onChange={handleDateChange as any}
              value={selectedDate}
              className="react-calender"
              tileDisabled={(date) =>
                // events.find(
                //   (event: any) =>
                //     new Date(event.date).getDate() === date.date.getDate()
                // )?.title === 14 ||
                !packages?.active_days?.includes(
                  date.date
                    .toLocaleString("en-US", { weekday: "long" })
                    .toLocaleLowerCase()
                )
              }
            />

            {/* {events.find(
              (event: any) =>
                new Date(event.date).getDate() ===
                new Date(selectedDate).getDate()
            ) && (
              <div>
                <h3>Event for {selectedDate.toDateString()}</h3>
                <p>
                  {
                    events.find(
                      (event: any) =>
                        new Date(event.date).getDate() ===
                        new Date(selectedDate).getDate()
                    ).title
                  }
                </p>
              </div>
            )} */}
          </div>
        </div>

        {/* Number of Person Selection Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Adult */}
          {guests?.map((item: any) => (
            <div className="space-y-2" key={item.id}>
              <h3 className="text-left px-2 font-bold text-gray-700">
                {item.name}
              </h3>
              <div className="flex justify-center px-5 py-2 text-gray-500 shadow-md rounded-2xl border-[1px]">
                <button
                  disabled={adultCount === 0 && childCount === 0}
                  className="bg-gray-200 w-6 h-6 grid place-content-center rounded-md"
                  onClick={() =>
                    // (
                    //   item.name === "Child"
                    //   ? (setChildGuestId(item.id) as any)
                    //   : (setAdultGuestId(item.id) as any)) &
                    item.name === "Child"
                      ? setChildCount(childCount - 1)
                      : (setAdultCount(adultCount - 1) as any)
                  }
                >
                  <FaMinus />
                </button>
                <div className="w-2/3 font-medium flex items-center justify-center">
                  <FaUser className="text-xs mr-1" />{" "}
                  {item.name === "Child" ? childCount : adultCount}{" "}
                </div>
                <button
                  disabled={adultCount + childCount >= packages?.limit}
                  className="bg-gray-200 w-6 h-6 grid place-content-center rounded-md"
                  onClick={() =>
                    (item.name === "Child"
                      ? (setChildGuestId(item.id) as any)
                      : (setAdultGuestId(item.id) as any)) &
                    (item.name === "Child"
                      ? setChildCount(childCount + 1)
                      : (setAdultCount(adultCount + 1) as any))
                  }
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}

          {/* Infant */}
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="checkbox"
              id="infant"
              onChange={() => setIsInfant(!isInfant)}
            />
            <label
              htmlFor="infant"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Infant available?
            </label>
          </div>
          {/* Infant */}
          {isInfant && (
            <div className="space-y-2">
              <h3 className="text-left px-2 font-bold text-gray-700">Infant</h3>
              <div className="flex justify-center px-5 py-2 text-gray-500 shadow-md rounded-2xl border-[1px]">
                <button
                  className="bg-gray-200 w-6 h-6 grid place-content-center rounded-md"
                  onClick={() => setInfantCount(infantCount - 1)}
                  disabled={infantCount === 0}
                >
                  <FaMinus />
                </button>
                <div className="w-2/3 font-medium flex items-center justify-center">
                  <FaUser className="text-xs mr-1" /> {infantCount}{" "}
                </div>
                <button
                  className="bg-gray-200 w-6 h-6 grid place-content-center rounded-md"
                  onClick={() => setInfantCount(infantCount + 1)}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* user information */}
        <UserInfoForm setUserInfo={setUserInfo} userInfo={userInfo} />
        {/* Payment Detail */}
        <div>
          <div className="flex flex-col">
            {/* Subtotal */}
            <div className="flex justify-end items-end gap-10 py-3 w-full border-y-[2px]">
              <p className="text-lg">Subtotal -</p>
              <p className="text-xl font-medium">
                <span className="text-sm">$</span>
                {(childCount * childPrice ? childCount * childPrice : 0) +
                  (adultCount * adultPrice ? adultCount * adultPrice : 0)}
                {}
              </p>
            </div>

            {/* {/* Processing Fee */}
            <div className="flex justify-end items-end gap-10 py-3 w-full border-b-[2px]">
              <p className="text-lg">Processing Fee -</p>
              <p className="font-medium">
                <span className="text-sm">$</span>{" "}
                {childPrice || adultPrice
                  ? ((childCount * childPrice + adultCount * adultPrice) * 5) /
                    100
                  : 0}
              </p>
            </div>

            {/* Total Bill */}
            <div className="flex justify-end items-end gap-10 py-3 w-full">
              <p className="text-lg">Total -</p>
              <p className="text-5xl font-bold text-cyan-500">
                <span className="text-3xl font-medium">$</span>
                {childPrice || adultPrice
                  ? childCount * childPrice +
                    adultCount * adultPrice +
                    ((childCount * childPrice + adultCount * adultPrice) * 5) /
                      100
                  : 0}
              </p>
            </div>

            {/* Pay Now button */}
            <div className="flex justify-end items-end gap-10 py-3 w-full">
              <div className="bg-cyan-400 flex flex-col items-center justify-center rounded-2xl text-white font-bold px-10  py-3">
                <button className="text-2xl" onClick={handleBooking}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
