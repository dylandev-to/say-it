import React from 'react';

const StyledHashtag = ({ text }) => {
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