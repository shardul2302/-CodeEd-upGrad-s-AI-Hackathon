import React from "react";

function MediaDisplay({ mediaUrl }) {
  if (!mediaUrl) return <p>No media available</p>;

  // Detect media type
  const isYouTube =
    mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be");
  const isImage = /\.(jpeg|jpg|png|gif|svg)$/i.test(mediaUrl);
  const isPDF = /\.pdf$/i.test(mediaUrl);

  // Convert YouTube URL to embed
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
      ) : isImage ? (
        <img
          src={mediaUrl}
          alt="Displayed content"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
        />
      ) : isPDF ? (
        <iframe
          src={mediaUrl}
          title="PDF Viewer"
          width="100%"
          height="600px"
          style={{ border: "none" }}
        />
      ) : (
        <p>Cannot display this media type</p>
      )}
    </div>
  );
}

// Convert YouTube URL to embed URL
function convertToEmbedUrl(url) {
  try {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (err) {
    console.error("Invalid YouTube URL", err);
  }

  return url;
}

export default MediaDisplay;
