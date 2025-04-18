import React from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;
  
  return (
    <div>
      <img 
        src={imageUrl} 
        alt="Uploaded Image" 
        style={{ maxWidth: "200px", margin: "10px 0" }} 
      />
    </div>
  );
};

export default ImagePreview;