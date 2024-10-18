import React from 'react';
import Svg, { Path } from 'react-native-svg';

const UpIcon = () => {
  return (
    <Svg fill="none">
      <Path
        stroke="#5F29C4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 1 6 8 5.5-8"
      />
    </Svg>
  );
};

export default UpIcon;
