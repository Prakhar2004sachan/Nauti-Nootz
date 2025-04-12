import { useState } from "react";
import Card from "../components/Card";
import { GoPlus } from "react-icons/go";
import Button from "../components/Button";
import ShareModel from "../components/ShareModel";
import CreateContent from "../components/CreateContent";
import { IoShareSocialOutline } from "react-icons/io5";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated, postedContent,gettingDate } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);

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
          <div className="flex gap-5 px-4 mb-4 items-center justify-between">
            <h1 className="text-xl lg:text-3xl px-2 font-semibold">
              All Notes
            </h1>
            <div className="flex gap-5 text-xs lg:text-md items-center justify-center">
              <Button
                title="Share Nootz"
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
            <div className="columns-[20rem] px-4 sm:p-0">
              {postedContent.map((item, index) => (
                <Card
                  key={index}
                  datePosted={gettingDate(item.date)}
                  type={item.type as "youtube" | "twitter" | "document"}
                  _id={item._id}
                  {...(item.type === "document"
                    ? { description: item.description }
                    : { link: item.link })}
                  title={item.title}
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

export default Home;
