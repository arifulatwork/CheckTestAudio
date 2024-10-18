import { Text } from 'react-native';

import typography from '@/commonStyles/Typography';
import ComponentWithBackground from '@/components/common/ComponentWithBackground';

const DevPlayground = () => {
  return (
    <ComponentWithBackground
      title="Approve tasks"
      type="header"
      goBackText="Go back"
      scroll={false}>
      <Text style={typography.h1}>You can develop here</Text>
    </ComponentWithBackground>
  );
};

export default DevPlayground;
