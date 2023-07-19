import { ConfigService } from '@nestjs/config';

interface EnvConfigInterface {
  readonly nodeEnv: string;
  readonly hostUrl: string;
  readonly smtpHost: string;
  readonly smtpPort: string;
  readonly smtpUser: string;
  readonly smtpPass: string;
  readonly firestoreType: string;
  readonly firestoreProjectId: string;
  readonly firestorePrivateKeyId: string;
  readonly firestorePrivateKey: string;
  readonly firestoreClientEmail: string;
  readonly firestoreClientId: string;
  readonly firestoreAuthUri: string;
  readonly firestoreTokenUri: string;
  readonly firestoreAutoProviderX509CertUrl: string;
  readonly firestoreClientX509CertUrl: string;
  readonly firestoreUniverseDomain: string;
}

export class EnvConfig implements EnvConfigInterface {
  public readonly nodeEnv: string;
  public readonly hostUrl: string;
  public readonly smtpHost: string;
  public readonly smtpPort: string;
  public readonly smtpUser: string;
  public readonly smtpPass: string;
  public readonly firestoreType: string;
  public readonly firestoreProjectId: string;
  public readonly firestorePrivateKeyId: string;
  public readonly firestorePrivateKey: string;
  public readonly firestoreClientEmail: string;
  public readonly firestoreClientId: string;
  public readonly firestoreAuthUri: string;
  public readonly firestoreTokenUri: string;
  public readonly firestoreAutoProviderX509CertUrl: string;
  public readonly firestoreClientX509CertUrl: string;
  public readonly firestoreUniverseDomain: string;
  private static _instance: EnvConfigInterface;

  constructor(configService: ConfigService) {
    this.nodeEnv = EnvConfig.getEnv(configService, 'NODE_ENV');
    this.hostUrl = EnvConfig.getEnv(configService, 'HOST_URL');
    this.smtpHost = EnvConfig.getEnv(configService, 'SMTP_HOST');
    this.smtpPort = EnvConfig.getEnv(configService, 'SMTP_PORT');
    this.smtpUser = EnvConfig.getEnv(configService, 'SMTP_USER');
    this.smtpPass = EnvConfig.getEnv(configService, 'SMTP_PASS');
    this.firestoreType = EnvConfig.getEnv(configService, 'FIRESTORE_TYPE');
    this.firestoreProjectId = EnvConfig.getEnv(
      configService,
      'FIRESTORE_PROJECT_ID',
    );
    this.firestorePrivateKeyId = EnvConfig.getEnv(
      configService,
      'FIRESTORE_PRIVATE_KEY_ID',
    );
    this.firestorePrivateKey = EnvConfig.getEnv(
      configService,
      'FIRESTORE_PRIVATE_KEY',
    );
    this.firestoreClientEmail = EnvConfig.getEnv(
      configService,
      'FIRESTORE_CLIENT_EMAIL',
    );
    this.firestoreClientId = EnvConfig.getEnv(
      configService,
      'FIRESTORE_CLIENT_ID',
    );
    this.firestoreAuthUri = EnvConfig.getEnv(
      configService,
      'FIRESTORE_AUTH_URI',
    );
    this.firestoreTokenUri = EnvConfig.getEnv(
      configService,
      'FIRESTORE_TOKEN_URI',
    );
    this.firestoreAutoProviderX509CertUrl = EnvConfig.getEnv(
      configService,
      'FIRESTORE_AUTO_PROVIDER_X509_CERT_URL',
    );
    this.firestoreClientX509CertUrl = EnvConfig.getEnv(
      configService,
      'FIRESTORE_CLIENT_X509_CERT_URL',
    );
    this.firestoreUniverseDomain = EnvConfig.getEnv(
      configService,
      'FIRESTORE_UNIVERSE_DOMAIN',
    );
  }

  static initialize = (configService: ConfigService) => {
    EnvConfig._instance = new EnvConfig(configService);
    return EnvConfig._instance;
  };

  static getEnv = (configService: ConfigService, envName: string) => {
    const value = configService.get(envName);
    if (!value) {
      throw new Error(`EnvConfig: ${envName} is undefined`);
    }
    return value;
  };
}
