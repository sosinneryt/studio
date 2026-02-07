import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.senseoasis.app',
  appName: 'SenseOasis',
  webDir: 'out',
  android: {
    buildOptions: {
      kotlinVersion: '1.8.22'
    }
  }
};

export default config;
