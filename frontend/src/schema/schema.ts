import * as z from "zod";

export const PostSchema = z
  .object({
    title: z.string().min(7, {
      message: "Title is not long enough",
    }),
    type: z.enum(["youtube", "twitter", "document"], {
      required_error: "Please select a type",
    }),
    link: z
      .string()
      .optional()
      .refine((val) => !val || /^https?:\/\/.+/.test(val), {
        message: "Link must be a valid URL",
      }),
    description: z.string().optional(), // initially optional
  })
  .refine(
    (data) => {
      if (["youtube", "twitter"].includes(data.type)) {
        return !!data.link && data.link.trim().length > 0;
      }
      return true;
    },
    {
      message: "Link is required for Youtube or Twitter",
      path: ["link"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "youtube") return data.link?.includes("youtube.com") && data.link?.includes("youtu.be");
      if (data.type === "twitter") return data.link?.includes("x.com");
      return true;
    },
    {
      message: `Link does not match the selected type`,
      path: ["link"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "document") {
        return !!data.description && data.description.trim().length > 0;
      }
      return true;
    },
    {
      message: "Description is required for document type",
      path: ["description"],
    }
  );


export const LoginSchema = z.object({})