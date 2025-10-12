import { useEffect, useState } from "react";

export default function useCols() {
  const mq3 = "(min-width: 1440px)";
  const mq1 = "(max-width: 1024px)";
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const m3 = window.matchMedia(mq3);
    const m1 = window.matchMedia(mq1);
    const update = () => setCols(m1.matches ? 1 : m3.matches ? 3 : 2);
    update();
    m3.addEventListener("change", update);
    m1.addEventListener("change", update);
    return () => {
      m3.removeEventListener("change", update);
      m1.removeEventListener("change", update);
    };
  }, []);

  return cols;
}