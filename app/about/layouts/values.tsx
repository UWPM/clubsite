"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Target,
  Lightbulb,
  Users,
  BookOpen,
  Heart,
  Calendar,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const values = [
  {
    icon: <Target size={36} strokeWidth={2.5} />,
    title: "Mission",
    description:
      "UW PM is dedicated to creating a thriving product management community and offering students exposure to the field of product.",
  },
  {
    icon: <Lightbulb size={36} strokeWidth={2.5} />,
    title: "Vision",
    description:
      "Inspire product-level thinking and explore the rationale behind what we should build and why that will propel students towards successful careers in product.",
  },
  {
    icon: <Calendar size={36} strokeWidth={2.5} />,
    title: "What We Do",
    description:
      "We host product case competitions, resume reviews, mock interviews, and panel discussions. Join us for ProdCon, our flagship competition each fall!",
  },
  {
    icon: <Heart size={36} strokeWidth={2.5} />,
    title: "Empowerment",
    description:
      "We empower anyone to succeed in product management by providing resources, knowledge, and opportunities, regardless of their background.",
  },
  {
    icon: <BookOpen size={36} strokeWidth={2.5} />,
    title: "Continuous Learning",
    description:
      "We embrace a growth mindset and encourage members to expand their horizons through learning from everyone around them.",
  },
  {
    icon: <Users size={36} strokeWidth={2.5} />,
    title: "Community",
    description:
      "We actively engage with the Waterloo product management community to exchange knowledge and build valuable long-lasting connections.",
  },
];

export default function Values() {
  const plugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  
  return (
    <section className="space-y-6 py-24">
      <h2 className="mx-24">Our values.</h2>
      <div className="relative pl-24">
        <Carousel
          opts={{
            loop: true,
            dragFree: true,
            align: "start",
          }}
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-6">
            {values.map((card, index) => (
              <CarouselItem key={index} className="basis-[400px] pl-6">
                <Card className="border-none transition-all duration-100 hover:scale-[1.01]">
                  <CardHeader className="pb-4">{card.icon}</CardHeader>
                  <CardContent className="space-y-2.5">
                    <h4 className="text-3xl font-semibold">{card.title}</h4>
                    <p className="line-clamp-4">{card.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-start gap-2 pt-6">
            <CarouselPrevious className="relative inset-auto translate-y-0" />
            <CarouselNext className="relative inset-auto translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}