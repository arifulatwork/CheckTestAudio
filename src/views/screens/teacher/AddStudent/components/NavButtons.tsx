import { StyleSheet, View } from 'react-native';

import BravoriButton from '@/components/common/BravoriButton';
import i18n from '@/translations/i18n';

type Props = {
  enabled: [boolean, boolean];
  movePhaseBy: (num: number) => void;
};

const NavButtons = ({ enabled, movePhaseBy }: Props) => {
  return (
    <View style={styles.buttonRow}>
      <View style={styles.left}>
        <BravoriButton
          enabled={enabled[0]}
          type="small"
          beforeIcon="IconBackWhite"
          bgColor="secondary"
          onPress={() => movePhaseBy(-1)}
        />
      </View>
      <View style={styles.right}>
        <BravoriButton
          onPress={() => movePhaseBy(1)}
          afterIcon="IconForwardWhite"
          type="small"
          enabled={enabled[1]}>
          {i18n.t('general.Next')}
        </BravoriButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

export default NavButtons;
