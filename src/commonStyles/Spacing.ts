import { StyleSheet } from 'react-native';

/* 
Padding styles:
padding top: pt1, pt2, pt3, pt4, pt5, pt6
padding bottom: pb1, pb2, pb3, pb4, pb5, pb6
padding left: pl1, pl2, pl3, pl4, pl5, pl6
padding right: pr1, pr2, pr3, pr4, pr5, pr6
padding vertical: pv1-pv6
padding horizontal: ph1-ph6
padding all sides: pa1-pa6

Margin styles: 
top: mt1-mt6
bottom: mb1-mb6
left: ml1-ml6
right: mr1-mr6
vertical: mv1-mv6
horizontal: mh1-mh6
all sides: ma1-ma6
*/

const BASE_VALUE = 15;

const reference = {
  padding: 'p',
  margin: 'm',
  '': 'a',
  Top: 't',
  Bottom: 'b',
  Left: 'l',
  Right: 'r',
  Vertical: 'v',
  Horizontal: 'h',
};

const properties: ('padding' | 'margin')[] = ['padding', 'margin'];
const positions: ('' | 'Top' | 'Bottom' | 'Left' | 'Right' | 'Vertical' | 'Horizontal')[] = [
  '',
  'Top',
  'Bottom',
  'Left',
  'Right',
  'Vertical',
  'Horizontal',
];

type styleList =
  | 'ma1'
  | 'ma2'
  | 'ma3'
  | 'ma4'
  | 'ma5'
  | 'ma6'
  | 'mb1'
  | 'mb2'
  | 'mb3'
  | 'mb4'
  | 'mb5'
  | 'mb6'
  | 'mh1'
  | 'mh2'
  | 'mh3'
  | 'mh4'
  | 'mh5'
  | 'mh6'
  | 'ml1'
  | 'ml2'
  | 'ml3'
  | 'ml4'
  | 'ml5'
  | 'ml6'
  | 'mr1'
  | 'mr2'
  | 'mr3'
  | 'mr4'
  | 'mr5'
  | 'mr6'
  | 'mt1'
  | 'mt2'
  | 'mt3'
  | 'mt4'
  | 'mt5'
  | 'mt6'
  | 'mv1'
  | 'mv2'
  | 'mv3'
  | 'mv4'
  | 'mv5'
  | 'mv6'
  | 'pa1'
  | 'pa2'
  | 'pa3'
  | 'pa4'
  | 'pa5'
  | 'pa6'
  | 'pb1'
  | 'pb2'
  | 'pb3'
  | 'pb4'
  | 'pb5'
  | 'pb6'
  | 'ph1'
  | 'ph2'
  | 'ph3'
  | 'ph4'
  | 'ph5'
  | 'ph6'
  | 'pl1'
  | 'pl2'
  | 'pl3'
  | 'pl4'
  | 'pl5'
  | 'pl6'
  | 'pr1'
  | 'pr2'
  | 'pr3'
  | 'pr4'
  | 'pr5'
  | 'pr6'
  | 'pt1'
  | 'pt2'
  | 'pt3'
  | 'pt4'
  | 'pt5'
  | 'pt6'
  | 'pv1'
  | 'pv2';
const style: any = {};

new Array(6).fill(0).forEach((_, index) => {
  const ix = index + 1;
  properties.forEach((property) => {
    positions.forEach((position) => {
      style[reference[property] + reference[position] + ix] = {
        [property + position]: BASE_VALUE * ix,
      };
    });
  });
});

const spacing = StyleSheet.create(style as Record<styleList, { [key: string]: number }>);

export default spacing;
