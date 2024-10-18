import * as Device from 'expo-device';

import { AnalyticsPayload } from '@/types/Analytics';
import { User } from '@/types/User';

type IdentifyProps = {
  userType?: { value: User['userType']; setOnce?: boolean };
  school?: { value: string; setOnce?: boolean };
  DeviceBrand?: { value: string; setOnce?: boolean };
  DeviceType?: { value: string; setOnce?: boolean };
  DeviceYearClass?: { value: string; setOnce?: boolean };
  DeviceModelName?: { value: string; setOnce?: boolean };
  DeviceOSVersion?: { value: string; setOnce?: boolean };
};

const getDeviceTypeString = (type: Device.DeviceType) => {
  if (type === Device.DeviceType.DESKTOP) return 'desktop';
  if (type === Device.DeviceType.PHONE) return 'phone';
  if (type === Device.DeviceType.TABLET) return 'tablet';
  if (type === Device.DeviceType.TV) return 'tv';
  return 'unknown';
};

const getAndFormatDeviceProperties = (): IdentifyProps => {
  return {
    DeviceBrand: { value: Device.brand || '' },
    DeviceType: { value: getDeviceTypeString(Device.deviceType || Device.DeviceType.UNKNOWN) },
    DeviceYearClass: { value: (Device.deviceYearClass || '').toString() },
    DeviceModelName: { value: Device.modelName || '' },
    DeviceOSVersion: { value: Device.osVersion || '' },
  };
};

export function init(userId?: string, identifyProps?: IdentifyProps) {}

/* 
    Note: To keep type-safety in analytics events, the payloads are defined in the @/types/Analytics file
*/
export default function track(data: AnalyticsPayload) {
  try {
    // amplitude
    const { name, payload } = data;

    // others?
    console.log('track event', data);
  } catch (e) {
    console.log('amplitude event error', e);
  }
}
