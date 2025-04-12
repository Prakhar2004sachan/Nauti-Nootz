import { useEffect } from "react";


export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  handler: VoidFunction
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}
