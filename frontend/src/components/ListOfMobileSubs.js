import React, { useState } from "react";
import EditIcon from "./Icons/EditIcon";
import DeletIcon from "./Icons/DeletIcon";
import AddEditMobileForm from "./AddEditMobileForm";
import DeleteSubs from "./DeleteSubs";
import { Modal } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import moment from "moment";

function ListOfMobileSubs({ getSubs, loading, searchResults, sarchButtonClicked }) {
  const [openEditForm, setopenEditForm] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [editsubs, setEditSubs] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [firstsliceValue, setfirstsliceValue] = useState(0);
  const [secondSliceValue, setsecondSliceValue] = useState(10);
  const [pageNumber, setpageNumber] = useState(1);

  // open edit from modal
  const showEditForm = () => {
    setopenEditForm(true);
    seteditMode(true);
  };

  // open delete modal
  const openDelete = () => {
    setShowDelete(true);
  };

  // close delete modal
  const closeDelete = () => {
    setShowDelete(false);
  };

  // close edit form modal
  const closeEditForm = () => {
    setopenEditForm(false);
  };

  // logic for pagination
  const handlePageChange = (value) => {
    setpageNumber(value);
    setfirstsliceValue(10 * value - 9);
    setsecondSliceValue(10 * value);
  };

  return (
    <div>
      <div className="btn-primary">
        <div className="col-span-5">
          <div className="hello">
            <div className="font-semibold text-sm ">ID</div>
            <div className="font-semibold text-sm whitespace-nowrap">
              OWNER ID
            </div>
            <div className="font-semibold text-sm whitespace-nowrap">
              USER ID
            </div>
            <div className="font-semibold text-sm whitespace-nowrap">
              PHONE NO.
            </div>
            <div className="font-semibold text-sm whitespace-nowrap">
              SUB TYPE
            </div>
            <div className="font-semibold text-sm">DATE</div>
          </div>
        </div>
        <div className="flex font-semibold text-sm">ACTIONS</div>
      </div>

      {loading ? (
        <>
          <div className="flex justify-center text-xl">Loading...</div>
        </>
      ) : getSubs.length < 1 ? (
        <>
          <div className="flex justify-center text-xl">
            {sarchButtonClicked && searchResults.length === 0
              ? `No result matched your query...`
              : `No data currently...`}
          </div>
        </>

        //41 / 10 = 4
        // 40 % 10 = 0
      ) : (
        getSubs.slice(firstsliceValue, secondSliceValue).map((subs, index) => {
          return (
            <div
              key={index}
              className="md:grid md:grid-cols-6 flex gap-4 border-2 rounded-lg w-full p-5 hover:border-blue-700 hover:shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-20 mb-2 overflow-x-scroll md:overflow-hidden  "
            >
              <div className="col-span-5">
                <div className="md:grid md:grid-cols-6 flex overflow-x-scroll md:overflow-hidden gap-2 ipad:grid-cols-6">
                  <div className="">{subs._id}</div>
                  <div className="">{subs.customer_id_owner}</div>
                  <div className="">{subs.customer_id_user}</div>
                  <div
                    title={subs.msisdn}
                    className=" cursor-pointer  truncate ..."
                  >
                    {subs.msisdn}
                  </div>
                  <div className="">{subs.service_type}</div>
                  <div className="">
                    {moment(subs.service_start_date).unix()}
                  </div>
                </div>
              </div>

              <div className="flex justify-start ">
                <div
                  className="pl-2 pr-2"
                  onClick={() => {
                    showEditForm();
                    setEditSubs(subs);
                  }}
                >
                  <EditIcon />
                </div>
                <div
                  className="pl-2 pr-2 "
                  onClick={() => {
                    openDelete();
                    setEditSubs(subs);
                  }}
                >
                  <DeletIcon />
                </div>
              </div>
            </div>
          );
        })
      )}

      {getSubs.length < 1 || getSubs.length < 11 ? (
        ``
      ) : (
        <div className="flex justify-center mt-10">
          <Pagination
            total={
              parseInt(getSubs.length / 10) + (getSubs.length % 10 > 0 ? 1 : 0)
            }
            page={pageNumber}
            onChange={handlePageChange}
          />
        </div>
      )}

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
