import { sample } from 'lodash';

import { Reward } from '@/types/Reward';

export const allRewards: Reward[] = [
  {
    id: 'cello1',
    PngSource: require('assets/rewards/stickers/instruments/cello1.png'),
    translationKey: 'rewards.instruments.cello',
  },
  {
    id: 'dblbass1',
    PngSource: require('assets/rewards/stickers/instruments/dblbass1.png'),
    translationKey: 'rewards.instruments.doubleBass',
  },
  {
    id: 'drums1',
    PngSource: require('assets/rewards/stickers/instruments/drums1.png'),
    translationKey: 'rewards.instruments.drums',
  },
  {
    id: 'frenchhorn1',
    PngSource: require('assets/rewards/stickers/instruments/frenchhorn1.png'),
    translationKey: 'rewards.instruments.frenchHorn',
  },
  {
    id: 'guitar1',
    PngSource: require('assets/rewards/stickers/instruments/guitar1.png'),
    translationKey: 'rewards.instruments.guitar',
  },
  {
    id: 'guitar2',
    PngSource: require('assets/rewards/stickers/instruments/guitar2.png'),
    translationKey: 'rewards.instruments.guitar',
  },
  {
    id: 'guitar3',
    PngSource: require('assets/rewards/stickers/instruments/guitar3.png'),
    translationKey: 'rewards.instruments.guitar',
  },
  {
    id: 'maracas1',
    PngSource: require('assets/rewards/stickers/instruments/maracas1.png'),
    translationKey: 'rewards.instruments.maracas',
  },
  {
    id: 'oboe1',
    PngSource: require('assets/rewards/stickers/instruments/oboe1.png'),
    translationKey: 'rewards.instruments.oboe',
  },
  {
    id: 'piano1',
    PngSource: require('assets/rewards/stickers/instruments/piano1.png'),
    translationKey: 'rewards.instruments.piano',
  },
  {
    id: 'piano2',
    PngSource: require('assets/rewards/stickers/instruments/piano2.png'),
    translationKey: 'rewards.instruments.piano',
  },
  {
    id: 'piano3',
    PngSource: require('assets/rewards/stickers/instruments/piano3.png'),
    translationKey: 'rewards.instruments.piano',
  },
  {
    id: 'saxophone1',
    PngSource: require('assets/rewards/stickers/instruments/saxophone1.png'),
    translationKey: 'rewards.instruments.saxophone',
  },
  {
    id: 'timpani1',
    PngSource: require('assets/rewards/stickers/instruments/timpani1.png'),
    translationKey: 'rewards.instruments.timpani',
  },
  {
    id: 'trumpet1',
    PngSource: require('assets/rewards/stickers/instruments/trumpet1.png'),
    translationKey: 'rewards.instruments.trumpet',
  },
  {
    id: 'viola1',
    PngSource: require('assets/rewards/stickers/instruments/viola1.png'),
    translationKey: 'rewards.instruments.viola',
  },
  {
    id: 'violin1',
    PngSource: require('assets/rewards/stickers/instruments/violin1.png'),
    translationKey: 'rewards.instruments.violin',
  },
  {
    id: 'violin2',
    PngSource: require('assets/rewards/stickers/instruments/violin2.png'),
    translationKey: 'rewards.instruments.violin',
  },
];

export const getRandomReward = (): Reward => {
  return sample(allRewards) as Reward;
};
