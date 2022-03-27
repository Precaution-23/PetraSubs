import React, { useState, useEffect } from "react";
import axios from "axios";

function MobileStats() {
  const [getSubs, setgetSubs] = useState([]);
  const [subOriginalData, setsubOriginalData] = useState([]);


  // fetch lists of mobile subscribers
  const fetchSubs = async () => {
    axios
      .get("/mobile-sub")
      .then((response) => {
        setgetSubs(response.data);
        setsubOriginalData(response.data);
      })
      .catch((error) => {
        alert("There Was An Error Fecthing The Data. Try Again");
        window.location.reload();
      });
  };

  // get prepaid subs 
  const getPrepaidSubs = () => {
    const prepaidSubs = subOriginalData.filter(item => item.service_type == `Prepaid`)
    return prepaidSubs
  }

    // get postpaid subs 
    const getPostPaidSubs = () => {
      const postPaidSubs = subOriginalData.filter(item => item.service_type == `Postpaid`)
      return postPaidSubs
    }

  useEffect(() => {
    fetchSubs()
    getPrepaidSubs()
    getPostPaidSubs()
  }, [])
  

  return (
    <div className="my-10">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="flex justify-between border-2 border-gray-400 rounded-md items-center h-20 p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20">
          <div className="font-bold text-lg">TOTAL NUMBERS</div>
          <div className="font-bold text-lg">{getSubs.length}</div>
        </div>
        <div className="flex justify-between border-2 border-gray-400 rounded-md items-center h-20 p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20">
          <div className="font-bold text-lg">PREPAID NUMBERS</div>
          <div className="font-bold text-lg">{getPrepaidSubs().length}</div>
        </div>
        <div className="flex justify-between border-2 border-gray-400 rounded-md items-center h-20 p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20">
          <div className="font-bold text-lg">POSTPAID NUMBERS</div>
          <div className="font-bold text-lg">{getPostPaidSubs().length}</div>
        </div>
      </div>
    </div>
  );
}

export default MobileStats;
