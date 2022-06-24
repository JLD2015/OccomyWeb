import { useEffect, useState } from "react";

export default function itemIsVisible(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  let observer = null;

  useEffect(() => {
    observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
