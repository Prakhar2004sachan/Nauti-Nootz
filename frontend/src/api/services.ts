import axios from "axios";

interface ContentInput {
  title: string;
  link?: string;
  type: string;
  description?: string;
}

export const postContent = async (data: ContentInput, token: string) => {
  const res = await axios.post("http://localhost:3000/api/add-content", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
