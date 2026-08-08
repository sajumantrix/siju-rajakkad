"use client";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Custom dots for the Shadcn Carousel
function CarouselDots() {
  const { api, selectedIndex } = useCarousel();
  const [dots, setDots] = React.useState([]);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setDots(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex justify-center gap-2 mt-6">
      {dots.map((_, index) => (
        <button
          key={index}
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            index === current ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials = [] }) {
  return (
    <section className="py-24 bg-white" id="testimonials">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="mb-12">
          <div className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-2">Reviews</div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">What People Say</h2>
          <p className="text-lg text-gray-600">Voices from readers, critics, and fellow writers</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full rounded-2xl overflow-hidden border-gray-200 shadow-sm hover:border-gray-900 transition-colors duration-300 bg-gradient-to-br from-white via-white to-[#f5eddb]">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="mb-4">
                        <Badge variant="secondary" className="uppercase tracking-wider text-[10px] font-bold">
                          {t.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="w-8 h-px bg-gray-200 mb-4" />
                      <div>
                        <div className="font-bold text-gray-900">{t.author}</div>
                        <div className="text-sm text-gray-500">{t.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          </div>

          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
}
