import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "@nextui-org/react";
import AddEditMobileForm from "../components/AddEditMobileForm";
import { mobileServiceType } from "../Services/utils";
import ListOfMobileSubs from "../components/ListOfMobileSubs";


function MobileSubscribers() {
  const [getSubs, setgetSubs] = useState([]);
  const [subOriginalData, setsubOriginalData] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setfilterValue] = useState("");
  const [loading, setLoading] = useState(false)
  const [searchResults, setsearchResults] = useState("")

  const [editMode, seteditMode] = useState(false)

  const [openForm, setOpenForm] = useState(false)

  //open add/edit mobile number form
  const openAddForm = () => {
    setOpenForm(true)
    seteditMode(false)
  }

  //close add/edit mobile number form
  const closeAddForm = () => setOpenForm(false)

  
  // fetch lists of mobile subscribers
  const fetchSubs = async () => {
    setLoading(true)
    axios
      .get("/mobile-sub")
      .then((response) => {
        setLoading(false)
        setgetSubs(response.data);
        setsubOriginalData(response.data);
      })
      .catch((error) => {
        alert("There Was An Error Fecthing The Data. Try Again")
        window.location.reload()
      });
  };


  // logic to search or sort through phone numbers
  const filterPhone = () => {
    const msisdn = searchValue;
    const service_type = filterValue!=='' ? filterValue : 'All';

    // filter numbers either prepaid or postpaid
    if(msisdn === '' && service_type !== "All" ){
        const filteredData = subOriginalData.filter(item => item.service_type === service_type)
        setgetSubs(filteredData)
        return
    }

    // filter all data available
    if(msisdn === '' && service_type === "All" ){
      const filteredData = subOriginalData
      setgetSubs(filteredData)
      return
  }

    // filter data with both number and service type values
    const filteredData = subOriginalData.filter(item => item.service_type === service_type && item.msisdn === msisdn.trim())
    setgetSubs(filteredData)
    setsearchResults(filteredData)

  };

  useEffect(() => {
      fetchSubs()
  }, [])


  return (
    <div className="my-10">
      <div className=" h-full">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div>
            <input
            type="text"
              value={searchValue}
              placeholder="Search phone number"
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-10 rounded-lg border-2 px-2 focus:outline-gray-400"
            />
          </div>
          <div>
            <select
              className="w-full h-10 rounded-lg focus:outline-gray-400 border-2 px-2"
              onChange={(e) => {
                setfilterValue(e.target.value);
              }}
            >
              <option value="All">All</option>
              {mobileServiceType.map((serviceType, index) => {
                return (
                  <option value={serviceType.name} key={index}>
                    {serviceType.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button
              className="w-full bg-blue-700 rounded-lg h-10 text-white"
              onClick={filterPhone}
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex md:justify-end justify-center mt-10 mb-10">
          <button className="bg-blue-700 md:w-40 w-full ipad-pro:w-[32%] ipad:w-[32%] next-hub:w-[32%] rounded-lg h-10 text-white" onClick={openAddForm}>
            Add Subscriber
          </button>
        </div>

        <ListOfMobileSubs
          getSubs={getSubs}
          loading={loading}
          searchResults={searchResults}
          />
      </div>

      <Modal
          preventClose
          width="600px"
          closeButton
          aria-labelledby="modal-title"
          open={openForm}
          onClose={closeAddForm}
        >
            <AddEditMobileForm editMode={editMode} />
        </Modal>
    </div>
  );
}

export default MobileSubscribers;
