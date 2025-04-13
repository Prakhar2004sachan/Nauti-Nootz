import  { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import CreateContent from "../components/CreateContent";
import ShareModel from "../components/ShareModel";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { PuffLoader } from "react-spinners";

function Twitter() {
  const { isAuthenticated, postedContent, gettingDate,loading } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);

    if (loading) {
      return (
        <div className="flex items-center justify-center w-full h-screen">
          <PuffLoader color="#5046e5" size={100} />
        </div>
      );
    }

  return (
    <div
      className={`bg-gray-100 w-full ${
        open || shareOpen ? "overflow-hidden h-screen" : ""
      } h-screen`}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        <div className="w-full lg:hidden">
          <NavBar />
        </div>
        <CreateContent
          open={open}
          close={() => {
            setOpen(false);
          }}
        />
        <ShareModel
          open={shareOpen}
          close={() => {
            setShareOpen(false);
          }}
        />

        <div className="flex-1 flex flex-col p-3 sm:p-6 overflow-y-auto">
          <div className="flex gap-5 mb-8 items-center justify-between">
            <h1 className="text-xl lg:text-3xl px-2 font-semibold">
              All Notes
            </h1>
            <div className="flex gap-5 text-xs lg:text-md items-center justify-center">
              <Button
                title="Share Nootz "
                startIcon={<IoShareSocialOutline className="size-6" />}
                variant="secondary"
                onClick={() => {
                  setShareOpen(true);
                }}
              />
              <Button
                title="Add Content"
                startIcon={<GoPlus className="size-6" />}
                variant="primary"
                onClick={() => {
                  setOpen(true);
                }}
              />
            </div>
          </div>
          {isAuthenticated && (
            <div className="columns-[20rem] w-full p-4 sm:p-0">
              {postedContent
                .filter((item) => item.type === "youtube")
                .map((item, index) => (
                  <Card
                    show={true}
                    datePosted={gettingDate(item.date)}
                    link={item.link}
                    key={index}
                    type={item.type as "youtube"}
                    title={item.title}
                    _id={item._id}
                  />
                ))}
            </div>
          )}
          {!isAuthenticated && (
            <div className="">You Are Not login Please login.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Twitter;
