"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/app/apply/supabaseClient";

// Define the allowed tags with their colors
const STATUS_TAGS = [
  { name: "Reject", color: "bg-red-500 hover:bg-red-600" },
  { name: "Review", color: "bg-yellow-500 hover:bg-yellow-600" },
  { name: "Advance", color: "bg-green-500 hover:bg-green-600" },
  { name: "Select", color: "bg-green-700 hover:bg-green-800" },
];

interface ApplicantTagsProps {
  currentTag: string | null; // Single tag instead of array
  applicantId: string;       // Added to update Supabase
  onTagChange: (tag: string | null) => void; // Updated callback
}

export function ApplicantTags({ currentTag, applicantId, onTagChange }: ApplicantTagsProps) {
  const [open, setOpen] = useState(false);

  const handleTagChange = async (tag: string | null) => {
    // Update the tag in Supabase
    const { error } = await supabase
      .from("applications")
      .update({ tag: tag })
      .eq("id", applicantId);

    if (error) {
      console.error("Error updating tag:", error);
      return;
    }

    // Update local state via callback
    onTagChange(tag);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-6">
          <Tag className="h-3 w-3 mr-1" /> {currentTag ? "Change Tag" : "Add Tag"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Status Tags</h4>
          <div className="flex flex-col gap-1">
            {STATUS_TAGS.map((tag) => (
              <Button
                key={tag.name}
                variant="outline"
                size="sm"
                className={`text-xs text-white ${tag.color} ${
                  currentTag === tag.name ? "ring-2 ring-offset-2 ring-black" : ""
                }`}
                onClick={() => handleTagChange(tag.name)}
              >
                <Tag className="h-3 w-3 mr-1" /> {tag.name}
              </Button>
            ))}
            {currentTag && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-gray-700"
                onClick={() => handleTagChange(null)}
              >
                Clear Tag
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}