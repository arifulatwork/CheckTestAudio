import TaskImageBlue from 'assets/svgs/NewUI_Elements/taskImages/task-image_blue.svg';
import TaskImageCarmin from 'assets/svgs/NewUI_Elements/taskImages/task-image_carmin.svg';
import TaskImageGreen from 'assets/svgs/NewUI_Elements/taskImages/task-image_green.svg';
import TaskImageOcher from 'assets/svgs/NewUI_Elements/taskImages/task-image_ocher.svg';
import TaskImagePink from 'assets/svgs/NewUI_Elements/taskImages/task-image_pink.svg';
import TaskImageYellow from 'assets/svgs/NewUI_Elements/taskImages/task-image_yellow.svg';
import TaskImageYellowCircle from 'assets/svgs/NewUI_Elements/taskImages/task-image_yellow_circle.svg';
import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Task } from '@/types/Task';

interface Props extends SvgProps {
  image: Task['image'];
}

const getComponent = (image: Props['image'], props: SvgProps) => {
  const components: Record<Task['image'], React.JSX.Element> = {
    blue: <TaskImageBlue {...props} />,
    carmin: <TaskImageCarmin {...props} />,
    green: <TaskImageGreen {...props} />,
    ocher: <TaskImageOcher {...props} />,
    pink: <TaskImagePink {...props} />,
    yellow: <TaskImageYellow {...props} />,
    yellowCircle: <TaskImageYellowCircle {...props} />,
  };

  return components[image];
};

const TaskImage = ({ image, ...props }: Props) => {
  return getComponent(image, props);
};

export default TaskImage;
