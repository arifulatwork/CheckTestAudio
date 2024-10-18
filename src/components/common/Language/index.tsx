import { StyleSheet, View } from 'react-native';

import Flag from './Flag';

import spacing from '@/commonStyles/Spacing';

export type LanguageCode = 'fi' | 'en';
type Props = {
  selected: LanguageCode;
  onSelect: (lang: LanguageCode) => void;
};

const Language = ({ selected, onSelect }: Props) => {
  return (
    <View style={style.container}>
      <Flag selected={selected} lang="en" onPress={onSelect} />
      <View style={spacing.mr1} />
      <Flag selected={selected} lang="fi" onPress={onSelect} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Language;
