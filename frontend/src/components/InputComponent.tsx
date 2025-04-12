import { useForm } from "react-hook-form";
import { PostSchema } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function InputComponent() {
  const { setRefreshTrigger } = useAuth();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      link: "",
      type: "youtube",
      description: "",
    },
  });
  const date = Date.now();
  const selectedType = watch("type");
  const onSubmit = async (data: z.infer<typeof PostSchema>) => {
    console.log("Submitting data:", data);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/add-content",
        { ...data, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefreshTrigger((prev: boolean) => !prev);
      console.log("✅ Content submitted:", response.data);
    } catch (err) {
      console.error("❌ Error submitting content:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (formErrors) => {
        console.log("Validation Failed: ", formErrors);
      })}
    >
      <input
        {...register("title")}
        type="text"
        placeholder="Enter your title"
        className="w-full mt-3 border border-zinc-300 px-4 py-2 rounded-lg"
      />
      {errors.title && (
        <p role="alert" className="text-red-600">
          {errors.title?.message}
        </p>
      )}
      <div className="relative w-32">
        <select
          {...register("type")}
          className="block border py-2 px-4 rounded-lg w-full border-zinc-300 mt-3"
        >
          <option value="youtube">Youtube</option>
          <option value="twitter">Twitter</option>
          <option value="document">Document</option>
        </select>
      </div>
      {errors.type && (
        <p role="alert" className="text-red-600">
          {errors.type?.message}
        </p>
      )}
      {selectedType === "document" ? (
        <div>
          <TextareaAutosize
            {...register("description")}
            placeholder="Write description"
            className="w-full max-h-[30rem] overflow-y-auto mt-3 border-zinc-300 border px-4 py-2 rounded-lg"
          />
          {errors.description && (
            <p role="alert" className="text-red-600">
              {errors.description?.message}
            </p>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            {...register("link")}
            placeholder="Paste your link"
            className="w-full mt-3 border-zinc-300 border px-4 py-2 rounded-lg"
          />
          {errors.link && (
            <p role="alert" className="text-red-600">
              {errors.link?.message}
            </p>
          )}
        </div>
      )}
      <input
        type="submit"
        className="mt-3 bg-purple-600 text-white px-8 py-2 rounded-lg cursor-pointer"
      />
    </form>
  );
}

export default InputComponent;
