import React from "react";

function MobileStats() {
  return (
    <div className="my-10">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex justify-between border-2 border-gray-400 rounded-md items-center h-20 p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20">
            <div className="font-bold text-lg">TOTAL NUMBERS</div>
            <div  className="font-bold text-lg">23500</div>
        </div>
        <div className="flex justify-between border-2 border-gray-400 rounded-md items-center h-20 p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20">
            <div className="font-bold text-lg">PREPAID NUMBERS</div>
            <div  className="font-bold text-lg">100000</div>
        </div>
        <div className="flex justify-between border-2 border-gray-400 rounded-md items-center h-20 p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20">
            <div className="font-bold text-lg">POSTPAID NUMBERS</div>
            <div  className="font-bold text-lg">25</div>
        </div>
      </div>
    </div>
  );
}

export default MobileStats;

