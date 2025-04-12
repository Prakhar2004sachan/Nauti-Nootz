import { useEffect } from "react";

export const useTwitterEmbed = (type: string) => {
  useEffect(() => {
    if (type !== "twitter") return;
    if ((window as any).twttr) {
      (window as any).twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [type]);
};
