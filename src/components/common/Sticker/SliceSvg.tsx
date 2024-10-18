import { Path, Svg } from 'react-native-svg';

export type SliceSVGProps = {
  numberOfSlices: number;
  numberOfSlicesToShow: number;
  width: number;
  height: number;
  startFromSlice?: number;
};

const SliceSVG = ({
  numberOfSlices,
  numberOfSlicesToShow,
  width,
  height,
  startFromSlice = 0,
}: SliceSVGProps) => {
  const renderSlices = () => {
    const slices: { percent: number; color: string }[] = [];

    for (let i = 0; i < numberOfSlicesToShow; i++) {
      slices.push({
        percent: 1 / numberOfSlices,
        color: i < startFromSlice ? 'transparent' : '#000',
      });
    }

    let cumulativePercent = 0;

    function getCoordinatesForPercent(percent: number) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }

    let arr = [];
    arr = slices.map((slice) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        'L 0 0', // Line
      ].join(' ');
      return <Path d={pathData} fill={slice.color} key={pathData} />;
    });
    return arr;
  };

  return (
    <Svg
      height={1.2 * height}
      width={1.2 * width}
      viewBox="-1 -1 2 2"
      style={{ transform: [{ rotate: '-90deg' }] }}>
      {renderSlices()}
    </Svg>
  );
};

export default SliceSVG;
