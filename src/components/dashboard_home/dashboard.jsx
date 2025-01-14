import React from "react";
import GreenCard from "../dashboard-cards/card1";
import BarChartCard from "../dashboard-cards/card2";
import ThirdCard from "../dashboard-cards/card3";
import FourthCard from "../dashboard-cards/card4";
import DashboardStat from "../dashboard-cards/card5";
import LinearChart from '../dashboard-cards/linearChart'
const Dashboard = () => {
    const activeUsers = 1245;
    const paymentsData = {
    dates: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6'],
    values: [100, 200, 150, 300, 250, 400], // Payments processed each day
  };

  const paymentFrequency = {
    weekly: 500,
    monthly: 300,
    biWeekly: 200,
  };
  const referrals = {
    total: 450,
    growth: 12,  // positive percentage
  };
    return (
      <>
    <div  className='flex flex-row justify-around'>
          <div><GreenCard /></div>
          <div><BarChartCard /></div>
          <div><ThirdCard /></div>
           
            </div>
            
            <div className="px-5 py-10">

                <div className="flex flex-row justify-between">
                    
                <div className="w-1/3"> <FourthCard /></div>
                <div style={{width:"45vw"}} className=""><LinearChart paymentsData={paymentsData} />
                    </div>
                </div>
            
            
            
            
            
            </div>
            <div className="px-4 py-5"><DashboardStat activeUsers={activeUsers}
        paymentFrequency={paymentFrequency}
                referrals={referrals}
            
            /></div>
            </>
  );
};

export default Dashboard;
