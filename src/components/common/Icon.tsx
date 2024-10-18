import IconAdd from 'assets/svgs/NewUI_Elements/buttonIcons/icon_add.svg';
import IconAddWhite from 'assets/svgs/NewUI_Elements/buttonIcons/icon_add_white.svg';
import Back from 'assets/svgs/NewUI_Elements/buttonIcons/icon_back.svg';
import IconBackWhite from 'assets/svgs/NewUI_Elements/buttonIcons/icon_back_white.svg';
import Pause from 'assets/svgs/NewUI_Elements/buttonIcons/icon_pause.svg';
import Play from 'assets/svgs/NewUI_Elements/buttonIcons/icon_play.svg';
import StartPractice from 'assets/svgs/NewUI_Elements/buttonIcons/icon_startPractice.svg';
import Calendar from 'assets/svgs/NewUI_Elements/pictograms/pict_calender.svg';
import EmailSelected from 'assets/svgs/NewUI_Elements/pictograms/pict_email_selected.svg';
import EmailUnselected from 'assets/svgs/NewUI_Elements/pictograms/pict_email_unselected.svg';
import Image from 'assets/svgs/NewUI_Elements/pictograms/pict_notes-images.svg';
import PasswordSelected from 'assets/svgs/NewUI_Elements/pictograms/pict_password.svg';
import PasswordUnselected from 'assets/svgs/NewUI_Elements/pictograms/pict_password_unselected.svg';
import PracticeSession from 'assets/svgs/NewUI_Elements/pictograms/pict_practice_sessions.svg';
import TaskApproved from 'assets/svgs/NewUI_Elements/pictograms/pict_task_approved.svg';
import CelebrationSmall from 'assets/svgs/UI_Elements/CelebrationSmall.svg';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { GreenMusic } from '../icons/uiElements/GreenMusic';

export interface IconProps {
  name:
    | 'TaskApproved'
    | 'GreenMusic'
    | 'Play'
    | 'Pause'
    | 'StartPractice'
    | 'Back'
    | 'Down'
    | 'Up'
    | 'Image'
    | 'Calendar'
    | 'IconAdd'
    | 'IconAddWhite'
    | 'IconBackWhite'
    | 'IconForwardWhite'
    | 'PracticeSession'
    | 'CelebrationSmall'
    | 'EmailSelected'
    | 'EmailUnselected'
    | 'PasswordSelected'
    | 'PasswordUnselected';
  style?: StyleProp<ViewStyle>;
  width?: SvgProps['width'];
  height?: SvgProps['height'];
}

const Icon = ({ name, style, width, height }: IconProps) => {
  const commonProps: {
    preserveAspectRatio: 'none';
    style: StyleProp<ViewStyle>;
    width?: SvgProps['width'];
    height?: SvgProps['height'];
  } = {
    preserveAspectRatio: 'none',
    style: [styles.icon, style],
  };

  if (width) commonProps.width = width;
  if (height) commonProps.height = height;

  if (name === 'TaskApproved') return <TaskApproved {...commonProps} />;
  if (name === 'GreenMusic') return <GreenMusic {...commonProps} />;
  if (name === 'Play') return <Play {...commonProps} />;
  if (name === 'Pause') return <Pause {...commonProps} />;
  if (name === 'StartPractice') return <StartPractice {...commonProps} />;
  if (name === 'Back') return <Back {...commonProps} />;
  if (name === 'Down')
    return <Back {...commonProps} style={[commonProps.style, styles.rotateDown]} />;
  if (name === 'Up') return <Back {...commonProps} style={[commonProps.style, styles.rotateUp]} />;
  if (name === 'Calendar') return <Calendar {...commonProps} />;
  if (name === 'Image') return <Image {...commonProps} />;
  if (name === 'IconAdd') return <IconAdd {...commonProps} />;
  if (name === 'IconAddWhite') return <IconAddWhite {...commonProps} />;
  if (name === 'CelebrationSmall') return <CelebrationSmall {...commonProps} />;
  if (name === 'EmailSelected') return <EmailSelected {...commonProps} />;
  if (name === 'EmailUnselected') return <EmailUnselected {...commonProps} />;
  if (name === 'PasswordUnselected') return <PasswordUnselected {...commonProps} />;
  if (name === 'PasswordSelected') return <PasswordSelected {...commonProps} />;
  if (name === 'PracticeSession') return <PracticeSession {...commonProps} />;
  if (name === 'IconBackWhite') return <IconBackWhite {...commonProps} />;
  if (name === 'IconForwardWhite')
    return <IconBackWhite {...commonProps} style={[commonProps.style, styles.flip]} />;
  return <></>;
};

const styles = StyleSheet.create({
  icon: {},
  flip: { transform: [{ rotate: '180deg' }] },
  rotateDown: { transform: [{ rotate: '-90deg' }] },
  rotateUp: { transform: [{ rotate: '90deg' }] },
});

export default Icon;
