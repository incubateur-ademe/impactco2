import { toPng, toJpeg } from "html-to-image";
import { useRef, useState } from "react";

export default function useScreenshot(slug, format = "png") {
  const ref = useRef(null);

  const transformFn = format === "png" ? toPng : toJpeg;

  const [isScreenshotting, setIsScreenshotting] = useState(false);

  const takeScreenshot = () => {
    setIsScreenshotting(true);
    setTimeout(() => {
      if (ref.current === null) {
        return;
      }
      transformFn(ref.current, {
        cacheBust: true,
        filter: (node) => {
          return !node.className || !node.className.includes ? true : !node.className?.includes("noscreenshot");
        },
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${slug}.${format}`;
          link.href = dataUrl;
          link.click();

          setIsScreenshotting(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 20);
    window?.please?.track(["trackEvent", "Interaction", "Screenshot", slug]);
  };

  return { ref, takeScreenshot, isScreenshotting };
}
