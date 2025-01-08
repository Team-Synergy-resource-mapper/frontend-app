import React from "react";
import DashboardPage from "../../../components/ad-request/index";


export const metadata = {
  title: "Vendor Add Hotel || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

export default async function page({ params }) {
  const id= (await params).id
  
  return (
    <>
      <DashboardPage id={id} />
    </>
  );
}
