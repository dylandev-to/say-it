import React from 'react';

// StyledHashtag component to render text with styled hashtags
const StyledHashtag = ({ text }) => {
  // Split the text based on hashtags and apply styling to hashtag parts
  const styledText = text.split(/(#\S+)/).map((part, index) => (
    part.startsWith('#') ? (
      <span key={index} style={{ color: "var(--shade)", fontWeight: "600" }}>{part}</span>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  ));

  return <p>{styledText}</p>;
};

export default StyledHashtag;