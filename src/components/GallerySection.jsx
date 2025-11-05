import React, { useState, useEffect } from "react";

function GallerySection() {
  // Sample images - replace these with your actual images later
  const initialImages = [
    {
      src: "assets/event/event1.jpg",
    },
    {
      src: "assets/event/event2.jpg",
    },
    {
      src: "assets/event/event3.jpg",
    },
    {
      src: "assets/event/event4.jpg",
    },
    {
      src: "assets/event/event5.jpg",
    },
  ];

  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all images and get their natural dimensions
    const loadImages = async () => {
      try {
        const imagePromises = initialImages.map((image) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve({
                ...image,
                width: img.naturalWidth,
                height: img.naturalHeight,
              });
            };
            img.onerror = () => {
              // If loading fails, use placeholder dimensions
              resolve({
                ...image,
                width: 600,
                height: 400,
              });
            };
            img.src = image.src;
          });
        });

        const loadedImages = await Promise.all(imagePromises);

        // Calculate grid spans based on actual image dimensions
        const calculatedImages = loadedImages.map((image) => {
          const aspectRatio = image.width / image.height;

          let span;
          if (aspectRatio > 1.7) {
            span = "col-span-2 row-span-1"; // Very wide image
          } else if (aspectRatio > 1.3) {
            span = "col-span-2 row-span-1"; // Wide image
          } else if (aspectRatio < 0.7) {
            span = "col-span-1 row-span-2"; // Tall image
          } else if (aspectRatio < 0.85) {
            span = "col-span-1 row-span-1"; // Slightly tall image
          } else {
            span = "col-span-1 row-span-1"; // Square-ish image
          }

          return { ...image, span };
        });

        setImages(calculatedImages);
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <div id="galeri" className="bg-[#0e2a44] py-12 px-4">
      <div className="mb-8 mr-auto ml-24">
        <img
          src="/assets/gallery/gallery_sticker.png"
          alt="Gallery"
          className="w-auto h-48"
        />
      </div>
      <div className="w-full max-w-6xl mx-auto">
        <div className="container mx-auto">
          {/* Responsive Masonry-style Grid */}
          {loading ? (
            <div className="text-center text-white py-12">
              Loading gallery...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden border-6 border-white bg-gray-800 ${image.span}`}
                >
                  <img
                    src={image.src}
                    alt={`Gallery image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GallerySection;
