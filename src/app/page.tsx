"use client";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { IVenue } from "./types/venue";

export default function Home() {
  const [venueListData, setVenueListData] = useState<IVenue[] | []>([]);
  const getData = async () => {
    try {
      const res = await apiCall.get("/venue");
      setVenueListData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header venueListData={venueListData} />
      <MainContent venueList={venueListData} />
    </>
  );
}
