import { useState, useEffect } from "react";
import { Image } from "antd";
import NextImage from "next/image";

const ImageZoomDialog = ({
  imageUrl,
  allImage,
}: {
  imageUrl: string;
  allImage: { altText: string; imageUrl: string; public_id: string }[];
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the current image index

  // Handle image click to set the clicked image index and open preview
  const handleImageClick = (clickedImageUrl: string) => {
    const index = allImage.findIndex((img) => img.imageUrl === clickedImageUrl);
    setCurrentIndex(index); // Set the index of the clicked image
    setPreviewVisible(true); // Open preview modal
    console.log(index, "setCurrentIndex", clickedImageUrl);
  };

  // Use `useEffect` to update the initial index when the `imageUrl` prop changes
  useEffect(() => {
    if (imageUrl) {
      const index = allImage.findIndex((img) => img.imageUrl === imageUrl);
      setCurrentIndex(index); // Set the initial index based on the imageUrl
    }
  }, [imageUrl, allImage]);

  // Circular navigation for onChange
  const handlePreviewChange = (newIndex: number) => {
    const totalImages = allImage.length;
    // Make the navigation circular
    if (newIndex < 0) {
      setCurrentIndex(totalImages - 1); // Go to the last image
    } else if (newIndex >= totalImages) {
      setCurrentIndex(0); // Go to the first image
    } else {
      setCurrentIndex(newIndex); // Otherwise, just update to the new index
    }
  };

  return (
    <div>
      {/* Clickable thumbnail that opens the preview */}
      <NextImage
        src={imageUrl}
        width={500}
        height={500}
        alt="Thumbnail Image"
        className="cursor-pointer object-cover w-full h-full"
        onClick={() => handleImageClick(imageUrl)} // Handle click on the thumbnail
      />

      {/* Preview Group */}
      <Image.PreviewGroup
        preview={{
          visible: previewVisible,
          onVisibleChange: setPreviewVisible,
          current: currentIndex, // Set the current image based on the index
          onChange: (newIndex) => handlePreviewChange(newIndex), // Handle circular navigation
        }}
      >
        {allImage.map((img) => (
          <Image
            key={img.public_id}
            src={img.imageUrl}
            alt={img.altText}
            width={0}
            height={0}
            style={{ display: "none" }}
          />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageZoomDialog;
