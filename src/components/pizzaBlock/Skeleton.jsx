import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 440"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="272" rx="25" ry="25" width="280" height="88" />
    <rect x="1" y="382" rx="16" ry="16" width="92" height="30" />
    <rect x="33" y="459" rx="0" ry="0" width="0" height="1" />
    <circle cx="132" cy="112" r="110" />
    <rect x="0" y="230" rx="19" ry="19" width="280" height="25" />
    <rect x="125" y="382" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
