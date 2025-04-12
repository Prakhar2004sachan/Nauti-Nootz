import * as z from "zod";

export const PostSchema = z
  .object({
    title: z.string().min(7, {
      message: "Title must be at least 7 characters long",
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
    description: z.string().optional(),
  })
  // Require link for youtube or twitter
  .refine(
    (data) => {
      if (["youtube", "twitter"].includes(data.type)) {
        return !!data.link?.trim();
      }
      return true;
    },
    {
      message: "Link is required for Youtube or Twitter",
      path: ["link"],
    }
  )
  // Link must match platform
  .refine(
    (data) => {
      if (data.type === "youtube") {
        return (
          data.link?.includes("youtube.com") || data.link?.includes("youtu.be")
        );
      }
      if (data.type === "twitter") {
        return (
          data.link?.includes("x.com") || data.link?.includes("twitter.com")
        );
      }
      return true;
    },
    {
      message: "Link does not match the selected type",
      path: ["link"],
    }
  )
  // Require description if type is document
  .refine(
    (data) => {
      if (data.type === "document") {
        return !!data.description?.trim();
      }
      return true;
    },
    {
      message: "Description is required for document type",
      path: ["description"],
    }
  );
