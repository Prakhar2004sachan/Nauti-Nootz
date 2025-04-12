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

  let videoId = "";
  let tweetId = "";
  let tweetOwner = "";

  // Parse YouTube links
  if (type === "youtube" && link) {
    try {
      const url = new URL(link);
      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.slice(1);
      } else if (url.hostname.includes("youtube.com")) {
        videoId = url.searchParams.get("v") ?? "";
      }
    } catch (err) {
      console.warn("Invalid YouTube link format",err);
    }
  }

  // Parse Twitter/X links
  if (type === "twitter" && link) {
    try {
      const url = new URL(link.replace("x.com", "twitter.com")); // normalize domain
      const pathParts = url.pathname.split("/");
      tweetOwner = pathParts[1];
      tweetId = pathParts[3]?.split("?")[0] ?? "";
    } catch (err) {
      console.warn("Invalid Twitter/X link format",err);
    }
  }

  const deletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/delete-content`,
        { contentId: _id },
        { headers: { Authorization: `Bearer ${token}` } }
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

      {/* Content */}
      <div className="mt-5">
        {type === "youtube" && videoId && (
          <iframe
            height="250"
            className="w-full rounded-xl"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        )}

        {type === "twitter" && tweetId && tweetOwner && (
          <div className="mt-3">
            <blockquote className="twitter-tweet">
              <a
                href={`https://twitter.com/${tweetOwner}/status/${tweetId}?ref_src=twsrc%5Etfw`}
                data-conversation="none"
              >
                View Tweet
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
