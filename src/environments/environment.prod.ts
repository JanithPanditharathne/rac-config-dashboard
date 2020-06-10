import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://10.101.16.79:8080/auth',
  realm: 'Configuration Portal',
  clientId: 'ibrac-config-portal-admin'
};

export const environment = {
  production: true,
  baseUrl: window['baseUrl'],
  keycloak: keycloakConfig
};
