import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import PaymentsTable from "@/components/payments-history/page";

const Users = () => {
    return (
        <DefaultLayout>
            {/* <Breadcrumb pageName="Users" /> */}

            <div className="flex flex-col gap-10">
                <PaymentsTable />            </div>
        </DefaultLayout>
    );
};

export default Users;
