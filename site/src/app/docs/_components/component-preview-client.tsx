"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

interface ComponentPreviewClientProps {
  children: React.ReactNode;
  code: string;
  highlightedCode: string;
  className?: string;
}

export function ComponentPreviewClient({
  children,
  code,
  highlightedCode,
  className,
}: ComponentPreviewClientProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isInViewport, setIsInViewport] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInViewport(entries.some((entry) => entry.isIntersecting));
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shouldRenderPreview = activeTab === "preview" && isInViewport;

  return (
    <div className="w-full rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between border-b bg-muted/30 px-2 h-12">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "px-2 py-1 text-xs font-medium rounded transition-colors",
              activeTab === "preview"
                ? "text-foreground bg-muted dark:bg-muted/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/80"
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              activeTab === "code"
                ? "text-foreground bg-muted dark:bg-muted/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/80"
            )}
          >
            Code
          </button>
        </div>

        <CopyButton text={code} />
      </div>

      <div
        ref={previewRef}
        className={cn("h-[400px] overflow-hidden relative", className)}
      >
        {/* Keep fixed container dimensions while mounting preview lazily.
            Unmounting the map when hidden/off-screen helps release resources
            on constrained mobile browsers. */}
        <div
          className={cn(
            "absolute inset-0",
            activeTab !== "preview" && "invisible pointer-events-none"
          )}
        >
          {shouldRenderPreview ? children : null}
        </div>
        <div
          className={cn(
            "absolute inset-0 p-4 overflow-auto text-sm bg-muted/20 [&_pre]:bg-transparent! [&_code]:bg-transparent!",
            activeTab !== "code" && "invisible pointer-events-none"
          )}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
