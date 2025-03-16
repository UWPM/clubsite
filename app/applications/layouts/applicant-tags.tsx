"use client"

import { useState } from "react"
import { Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Common tags that might be used across applicants
const COMMON_TAGS = [
  "experienced",
  "junior",
  "mid-level",
  "senior",
  "frontend",
  "backend",
  "fullstack",
  "ui-ux",
  "graphic",
  "content",
  "social-media",
  "organized",
  "detail-oriented",
  "creative",
  "analytical",
  "communication",
  "networking",
  "technical",
  "promising",
  "needs-followup",
  "strong-culture-fit",
  "leadership",
  "teamwork",
]

interface ApplicantTagsProps {
  currentTags: string[]
  onAddTag: (tag: string) => void
}

export function ApplicantTags({ currentTags, onAddTag }: ApplicantTagsProps) {
  const [customTag, setCustomTag] = useState("")
  const [open, setOpen] = useState(false)

  const handleAddCustomTag = () => {
    if (customTag.trim() && !currentTags.includes(customTag.trim())) {
      onAddTag(customTag.trim())
      setCustomTag("")
      setOpen(false)
    }
  }

  const filteredCommonTags = COMMON_TAGS.filter((tag) => !currentTags.includes(tag))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-6">
          <Tag className="h-3 w-3 mr-1" /> Add Tag
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Add Custom Tag</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Enter tag name"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCustomTag()
                  }
                }}
              />
              <Button size="sm" onClick={handleAddCustomTag}>
                Add
              </Button>
            </div>
          </div>

          {filteredCommonTags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Common Tags</h4>
              <div className="flex flex-wrap gap-1">
                {filteredCommonTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      onAddTag(tag)
                      setOpen(false)
                    }}
                  >
                    <Tag className="h-3 w-3 mr-1" /> {tag}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

