import React from "react";
import axios from "axios";

function DeleteSubs({ deleteId, closeDelete }) {

  // delete subscriber
  const deleteSub = async () => {
    axios
      .delete(`/mobile-sub/${deleteId._id}`)
      .then((response) => {
        alert("Deletion Successful")
        setTimeout(() => {
            window.location.reload()
        }, 1500)
      })
      .catch((error) => {
        alert("Error Trying To Delete. Try again")
            window.location.reload()
      });
  };
  return (
    <div>
        <div className="flex justify-center text-xl">Are you sure you want to delete?</div>
      <div className="grid grid-cols-2 p-5">
        <div>
          <button className="bg-green-500 md:w-40 w-full rounded-lg h-10 text-white" onClick={deleteSub}>
            YES
          </button>
        </div>
        <div>
          <button
            className=" bg-red-600  md:w-40 w-full rounded-lg h-10 text-white"
            onClick={closeDelete}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSubs;
