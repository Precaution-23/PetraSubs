import React, { useState } from "react";
import EditIcon from "./Icons/EditIcon";
import DeletIcon from "./Icons/DeletIcon";
import AddEditMobileForm from "./AddEditMobileForm";
import DeleteSubs from "./DeleteSubs";
import { Modal } from "@nextui-org/react";
import { Pagination } from '@nextui-org/react';


function ListOfMobileSubs({getSubs, loading}) {
  const [openEditForm, setopenEditForm] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [editsubs, setEditSubs] = useState({})
  const [showDelete, setShowDelete] = useState(false)

  const showEditForm = () => {
    setopenEditForm(true);
    seteditMode(true);
  };

  const openDelete = () => {
    setShowDelete(true)
  }

  const closeDelete = () => {
    setShowDelete(false)
  }

  const closeEditForm = () => {
    setopenEditForm(false);
  };



  return (
    <div>
      <div
        className="flex justify-between border-2 rounded-lg w-full p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20 mb-2"
      >
        <div className="grid grid-cols-4">
          <div className="">ID</div>
          <div className="md:pl-5">Phone No.</div>
          <div className="md:pl-5">Sub Type</div>
          <div className="md:pl-5">Sub Date</div>
        </div>

        <div className="md:flex md:justify-between hidden">
            ACTIONS
        </div>
      </div>

      {
          loading ? (
              <>
              <div className="flex justify-center text-xl">Loading</div></>
          ) : getSubs.length < 1 ? (
            <>
            <div className="flex justify-center text-xl">No data currently...</div>
            </>
          ) : (
            getSubs.map((subs, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between border-2 rounded-lg w-full p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20 mb-2"
                  >
                    <div className="grid md:grid-cols-4 grid-cols-1">
                      <div className="">{subs.customer_id_user}</div>
                      <div className="">{subs.msisdn}</div>
                      <div className="">{subs.service_type}</div>
                      <div className="">{subs.service_start_date}</div>
                    </div>
        
                    <div className="md:flex md:justify-between hidden">
                      <div className="pl-2 pr-2" onClick={() => {
                          showEditForm()
                          setEditSubs(subs)
                      }}>
                        <EditIcon />
                      </div>
                      <div className="pl-2 pr-2" onClick={() => {
                          openDelete()
                          setEditSubs(subs)
                      }}>
                        <DeletIcon />
                      </div>
                    </div>
                  </div>
                );
              })
          )
      }

      <div className="flex justify-center mt-10">
        <Pagination total={getSubs.length} initialPage={1} />
      </div>
      
      

      <Modal
        preventClose
        width="600px"
        closeButton
        aria-labelledby="modal-title"
        open={openEditForm}
        onClose={closeEditForm}
      >
        <AddEditMobileForm editMode={editMode} editsubs={editsubs} />
      </Modal>

      <Modal
        preventClose
        closeButton
        aria-labelledby="modal-title"
        open={showDelete}
        onClose={closeDelete}
      >
        <DeleteSubs deleteId={editsubs} closeDelete={closeDelete} />
      </Modal>
    </div>
  );
}

export default ListOfMobileSubs;
