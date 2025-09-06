
import React from "react";

function MediaDisplay({ mediaUrl }) {
  if (!mediaUrl) return <p>No media available</p>;

  // Check if it's YouTube link
  const isYouTube = mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be");

  const embedUrl = isYouTube ? convertToEmbedUrl(mediaUrl) : null;

  return (
    <div>
      {isYouTube ? (
        <iframe
          width="560"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src={mediaUrl}
          alt="Displayed content"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
    </div>
  );
}

// Convert YouTube URL to embed URL
function convertToEmbedUrl(url) {
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  if (url.includes("youtu.be")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
}

export default MediaDisplay;
// Note: This component currently supports YouTube links and image URLs. For other video sources, additional handling may be needed.