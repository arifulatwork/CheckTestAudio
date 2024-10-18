import { ImageRequireSource } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type Reward = {
  id: string;
  SvgComponent?: React.FC<SvgProps>;
  PngSource?: ImageRequireSource;
  translationKey: string;
};
