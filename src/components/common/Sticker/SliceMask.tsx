import MaskedView from '@react-native-masked-view/masked-view';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';

import SliceSVG, { SliceSVGProps } from './SliceSvg';

type SliceMaskProps = SliceSVGProps;

const SliceMask = ({
  numberOfSlices,
  numberOfSlicesToShow,
  startFromSlice,
  children,
  width,
  height,
}: PropsWithChildren<SliceMaskProps>) => {
  return (
    <View
      style={{
        // backgroundColor: 'blue',
        // borderWidth: 1,
        // borderColor: 'red',
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaskedView
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SliceSVG
              numberOfSlices={numberOfSlices}
              numberOfSlicesToShow={numberOfSlicesToShow}
              startFromSlice={startFromSlice}
              width={width}
              height={height}
            />
          </View>
        }>
        {children}
      </MaskedView>
    </View>
  );
};

export default SliceMask;
