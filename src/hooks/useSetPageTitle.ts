import { useEffect } from "react";

export function useSetPageTitle(title: string | null) {
  useEffect(() => {
    if (title) document.title = title;
  }, []);
}
