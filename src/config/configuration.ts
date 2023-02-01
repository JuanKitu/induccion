import * as PACKAGE_JSON from '../../package.json';
import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('config', () => {
  return {
    project: {
      name: PACKAGE_JSON.name,
      version: PACKAGE_JSON.version,
    },
    server: {
      isProd: process.env.NODE_ENV === 'production',
      port: parseInt(process.env.PORT, 10) || 3000,
      corsEnabled: process.env.CORS_ENABLED.toLowerCase() === 'true',
    },
    swagger: {
      enabled: process.env.SWAGGER_ENABLED.toLowerCase() === 'true',
    },
  };
});
