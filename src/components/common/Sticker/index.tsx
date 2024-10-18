import { Image, ImageRequireSource } from 'react-native';
import { SvgProps } from 'react-native-svg';

import SliceMask from './SliceMask';
import { SliceSVGProps } from './SliceSvg';

type Props = {
  size: number;
  SvgComponent?: React.FC<SvgProps>;
  PngSource?: ImageRequireSource;
} & Omit<SliceSVGProps, 'width' | 'height'>;

const Sticker = ({
  numberOfSlices,
  numberOfSlicesToShow,
  size,
  SvgComponent,
  PngSource,
  startFromSlice,
}: Props) => {
  if (numberOfSlices === numberOfSlicesToShow && !startFromSlice)
    return SvgComponent ? (
      <SvgComponent height={size} width={size} />
    ) : PngSource ? (
      <Image source={PngSource} resizeMode="contain" style={{ height: size, width: size }} />
    ) : null;

  return (
    <SliceMask
      startFromSlice={startFromSlice}
      numberOfSlices={numberOfSlices}
      numberOfSlicesToShow={numberOfSlicesToShow}
      width={size}
      height={size}>
      {SvgComponent ? (
        <SvgComponent height={size} width={size} />
      ) : PngSource ? (
        <Image source={PngSource} resizeMode="contain" style={{ height: size, width: size }} />
      ) : null}
    </SliceMask>
  );
};

export default Sticker;
