import { useEffect, useState } from "react";

export const useHref = () => {
  const [mounted, setMounted] = useState(false);

  const href =
    typeof window !== "undefined" && window.location.href
      ? window.location.href
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "";

  return href;
};
