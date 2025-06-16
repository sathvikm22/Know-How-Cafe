import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"

const Testimonials = () => {
  const [api, setApi] = useState<any>()

  const galleryImages = [
    {
      src: "/lovable-uploads/69a6f874-417c-4128-b682-e4614101080c.png",
      alt: "Art studio with paintbrushes hanging from ceiling"
    },
    {
      src: "/lovable-uploads/235567bf-79a2-4bdb-80b4-086434af6897.png", 
      alt: "Creative workspace with colorful cushions"
    },
    {
      src: "/lovable-uploads/28f161cc-8da8-47f8-9a46-8191dc3dcbad.png",
      alt: "Craft making workspace with supplies"
    },
    {
      src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      alt: "Pottery workshop with clay work"
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      alt: "Art supplies and painting materials"
    },
    {
      src: "https://images.unsplash.com/photo-1572602206002-ac90088b7b2b?w=400&h=400&fit=crop",
      alt: "Creative art studio space"
    }
  ];

  useEffect(() => {
    if (!api) {
      return
    }

    // Much smoother auto-scroll every 2.5 seconds
    const interval = setInterval(() => {
      api.scrollNext()
    }, 2500)

    return () => clearInterval(interval)
  }, [api])

  return (
    <section id="testimonials" className="py-20 bg-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Studio Gallery
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a glimpse into our vibrant creative spaces where artistry comes to life
          </p>
        </div>

        {/* White Rectangle Container */}
        <div className="bg-white rounded-3xl p-2 mx-auto max-w-7xl shadow-2xl border-4 border-pink-200/60 relative">
          <div className="absolute -inset-1 rounded-3xl pointer-events-none z-0 bg-gradient-to-r from-pink-400 via-orange-300 to-blue-400 blur-lg opacity-40 animate-pulse"></div>
          <div className="relative overflow-hidden rounded-2xl p-2 sm:p-4 md:p-6 lg:p-8 bg-white z-10">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "center",
                loop: true,
                duration: 20,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
            >
              <CarouselContent className="-ml-4">
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-4 basis-2/3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
                    <div className="p-2">
                      <div className="aspect-square overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 bg-white">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
