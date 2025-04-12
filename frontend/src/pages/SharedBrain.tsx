// import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function SharedBrain() {
  const { gettingDate } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState<{ username: string; content: any[] } | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/share/${id}`);
        setData(res.data);
        console.log(res);
      } catch (err) {
        console.error("Error fetching shared content", err);
      }
    };
    if (id) fetchData();
  }, [id]);
  return (
    <div className={`bg-gray-100 w-full h-screen`}>
      <div className="flex flex-col lg:flex-row h-full w-full">
        {data ? (
          <div className="flex-1 flex-col p-3 sm:p-6 overflow-y-auto">
            <h1 className="text-xl lg:text-3xl px-2 py-4 font-semibold">
              All Notes
            </h1>

            <div className="columns-[20rem] p-4 sm:p-0">
              {data?.content.map((item, index) => (
                <Card
                  datePosted={gettingDate(item.date)}
                  {...(item.type === "document"
                    ? { description: item.description }
                    : { link: item.link })}
                  type={item.type as "youtube" | "twitter" | "document"}
                  title={item.title}
                  key={index}
                  _id={item._id}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="px-3 text-xl font-semibold w-full h-screen flex items-center justify-center">
            You enter wrong url ❌
          </div>
        )}
      </div>
    </div>
  );
}

export default SharedBrain;
