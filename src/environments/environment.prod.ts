import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://dev-79.zone24x7.lk:8080/auth',
  realm: 'config_portal',
  clientId: 'ibrac-cp-admin'
};

export const environment = {
  production: true,
  baseUrl: window['baseUrl'],
  keycloak: keycloakConfig
};
