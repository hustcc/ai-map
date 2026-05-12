"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { docsNavigation } from "@/lib/docs-navigation";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSelect(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="hidden group sm:flex items-center gap-2 h-8 px-3 rounded-full bg-secondary/60 border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Search...</span>
        <Kbd className="hidden sm:inline-flex ml-2">⌘K</Kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Documentation"
        description="Search for documentation pages and components"
      >
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {docsNavigation.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.title}
                  onSelect={() => handleSelect(item.href)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
