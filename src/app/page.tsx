import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import UserTable from "@/components/Tables/UserTable";
import Dashboard from '@/components/dashboard_home/dashboard'
export default function Home(data: any) {


  return (
    <>
      <DefaultLayout>
        {/* {/* <ECommerce /> */}
        <Dashboard />
        {/* <UserTable /> */}
      </DefaultLayout>
    </>
  );
}

