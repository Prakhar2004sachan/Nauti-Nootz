import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { PuffLoader } from "react-spinners";


function SharedBrain() {
  const { gettingDate } = useAuth();
  const { id } = useParams();

  const [data, setData] = useState<{ username: string; content: any[] } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/api/share/${id}`
        );

        // Optional log
        console.log("Fetched response:", res.data);

        if (!res.data || !Array.isArray(res.data.content)) {
          setError(true); // Wrong format
        } else {
          setData(res.data);
        }
      } catch (err) {
        console.error("Error fetching shared content", err);
        setError(true); // 404, server down etc.
      } finally {
        // 💡 Delay setting loading=false by 200ms to allow state updates
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ✅ Keep showing loader until all things sorted
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <PuffLoader color="#5046e5" size={100} />
      </div>
    );
  }

  // ❌ Show error ONLY if loading is done AND it really failed
  if (error || !data) {
    return (
      <div className="px-3 text-xl font-semibold w-full h-screen flex items-center justify-center">
        You entered a wrong URL ❌
      </div>
    );
  }

  return (
    <div className={`bg-gray-100 w-full h-screen`}>
      <div className="flex flex-col lg:flex-row h-full w-full">
        <div className="flex-1 flex-col p-3 sm:p-6 overflow-y-auto">
          <h1 className="text-xl lg:text-3xl px-2 py-4 font-semibold">
            All Notes
          </h1>
          <div className="columns-[20rem] p-4 sm:p-0">
            {data.content.length > 0 ? (
              data.content.map((item, index) => (
                <Card
                  datePosted={gettingDate(item.date)}
                  {...(item.type === "document"
                    ? { description: item.description }
                    : { link: item.link })}
                  type={item.type as "youtube" | "twitter" | "document"}
                  title={item.title}
                  key={index}
                  _id={item._id}
                  show={false}
                />
              ))
            ) : (
              <div className="text-center text-lg text-gray-500">
                No posts found for this shared brain 🧠
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedBrain;
