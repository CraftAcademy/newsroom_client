import React from "react";

const Ad = ({ link, id, img, alt }) => {
  return (
    <a id={id} href={link}>
      <img src={img} alt={alt} />
    </a>
  );
};

export default Ad;
