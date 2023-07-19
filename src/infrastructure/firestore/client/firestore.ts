import admin from 'firebase-admin';
import { EnvConfig } from 'src/env';

export class Firestore {
  static initialize = () => {
    admin.initializeApp({
      credential: admin.credential.cert(this.getServiceAccount()),
    });
  };

  static getServiceAccount = (): any => {
    const env = EnvConfig.getInstance();
    const serviceAccount = {
      type: env.firestoreType,
      project_id: env.firestoreProjectId,
      private_key_id: env.firestorePrivateKeyId,
      private_key: env.firestorePrivateKey,
      client_email: env.firestoreClientEmail,
      client_id: env.firestoreClientId,
      auth_uri: env.firestoreAuthUri,
      token_uri: env.firestoreTokenUri,
      auth_provider_x509_cert_url: env.firestoreAutoProviderX509CertUrl,
      client_x509_cert_url: env.firestoreClientX509CertUrl,
      universe_domain: env.firestoreUniverseDomain,
    };
    return serviceAccount;
  };
}
