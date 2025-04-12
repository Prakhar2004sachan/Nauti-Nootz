import { RxCross2 } from "react-icons/rx";
import Button from "./Button";
import { MdContentCopy } from "react-icons/md";
import { useOutsideClick } from "../utils/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

function ShareModel({ open, close }: { open: boolean; close: () => void }) {
  const [link, setLink] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const model = useRef<HTMLDivElement>(null);
  useOutsideClick(model, close);

  useEffect(() => {
    const checkingExistingLink = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:3000/api/shared", // backend will return existing hash if found
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.hash) {
          setLink(true);
          setUrl(res.data.hash);
        }
      } catch (err: any) {
       if (err.response && err.response.status === 404) {
         setLink(false);
         setUrl(null);
       } else {
         console.log("❌ Error checking existing share link:", err);
       }
      }
    };
    if (open) checkingExistingLink();
  }, [open]);

  const shareLinkHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("you are not log in");
        return;
      }
      const res = await axios.post(
        "http://localhost:3000/api/share",
        {
          share: !link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!link && res.data.hash) {
        // Creating share link
        setLink(true);
        setUrl(res.data.hash);
      } else {
        // Deleting share link
        setLink(false);
        setUrl(null);
      }
      console.log(res.data);
    } catch (error) {
      console.log("Error Genrating the links", error);
    }
  };
  console.log(url);
  return (
    <div>
      {open && (
        <div className="w-full h-screen bg-black opacity-95 top-0 left-0 fixed flex justify-center items-center">
          <div
            ref={model}
            className="bg-white flex flex-col px-8 py-4 rounded-xl max-w-[15rem] sm:max-w-[20rem] lg:max-w-[30rem]"
          >
            <div className="flex justify-between items-center w-full">
              <h3 className="font-semibold text-2xl">
                Share Your Nauti Nootz
              </h3>
              <RxCross2 className="size-6 cursor-pointer" onClick={close} />
            </div>
            <p className="my-5 text-zinc-500 text-lg">
              Share your entire collection of notes, documents, tweets, and
              videos with others. They'll be able to see your Nootz.
            </p>
            {url && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${import.meta.env.VITE_FRONTENDURL}/brain/share/${url}`
                  );
                  alert("Link copied to clipboard");
                }}
                className="my-4 flex gap-3 px-2 items-center justify-center py-2 bg-gray-300 hover:bg-gray-300 rounded-xl"
              >
                <MdContentCopy className="size-5" />
                Copy Link
              </button>
            )}
            {!link ? (
              <Button
                variant="primary"
                startIcon={<MdContentCopy className="size-6" />}
                title="Share Brain"
                onClick={shareLinkHandler}
              />
            ) : (
              <Button
                variant="primary"
                startIcon={<AiOutlineDelete className="size-6" />}
                title="Delete Share"
                onClick={shareLinkHandler}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShareModel;
