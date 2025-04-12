import { AiOutlineDelete } from "react-icons/ai";
import { FiTwitter, FiYoutube } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTwitterEmbed } from "../utils/useTwitterEmbed";

interface cardProps {
  _id: string;
  title: string;
  type: "youtube" | "twitter" | "document";
  datePosted: string;
  link?: string;
  description?: string;
}

function Card({ _id, title, type, datePosted, description, link }: cardProps) {
  useTwitterEmbed(type);
  const { setRefreshTrigger } = useAuth();
  const linkSplit = link?.split("/");
  let id = null;
  let tweetOwner = null;
  if (link?.includes("=")) {
    const youtubeId = linkSplit?.pop()?.split("=")[1];
    id = youtubeId;
  } else {
    const tweetId = linkSplit?.pop();
    id = tweetId;
    tweetOwner = link?.split("/")[3];
  }

  const deletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/delete-content`,
        {
          contentId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefreshTrigger((prev: boolean) => !prev);
      console.log(res);
    } catch (error) {
      console.log("Error deleting the post", error);
    }
  };

  return (
    <div className="w-full mb-[1rem] break-inside-avoid bg-white border border-zinc-200 rounded-xl shadow-xl px-4 py-6">
      {/* Header */}
      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-3">
          {type === "youtube" && <FiYoutube className="size-5" />}
          {type === "twitter" && <FiTwitter className="size-5" />}
          {type === "document" && <GoBook className="size-5" />}
          <h4 className="font-semibold text-md">{title}</h4>
        </div>
        <AiOutlineDelete
          className="size-5 cursor-pointer text-zinc-400"
          onClick={deletePost}
        />
      </div>
      {/* content */}
      <div className="mt-5">
        {type === "youtube" && (
          <iframe
            // width="560"
            height="250"
            className="w-full rounded-xl"
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        )}
        {type === "twitter" && (
          <div className="mt-3">
            <blockquote className="twitter-tweet">
              <a
                href={`https://twitter.com/${tweetOwner}/status/${id}?ref_src=twsrc%5Etfw`}
                data-conversation="none"
              >
                April 7, 2025
              </a>
            </blockquote>
          </div>
        )}
        {type === "document" && <div className="mt-3">{description}</div>}
      </div>
      <div className="mt-3">
        <p className="text-zinc-500">Added on {datePosted}</p>
      </div>
    </div>
  );
}

export default Card;
