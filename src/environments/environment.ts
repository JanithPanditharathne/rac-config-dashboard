import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://10.101.16.79:8080/auth',
  realm: 'Configuration Portal',
  clientId: window['keycloakClientID']
};

export const environment = {
  production: false,
  baseUrl: window['baseUrl'],
  keycloak: keycloakConfig
};
