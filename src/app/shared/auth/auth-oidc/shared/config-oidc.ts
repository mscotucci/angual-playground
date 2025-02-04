export interface OidcConfigurations {
    issuer: string;
    clientId: string;
    jwks_uri: string;
    redirect_uri: string;
    responseType?: string;
    scope: string;
    strictDiscoveryDocumentValidation?: boolean;
    skipIssuerCheck?: boolean;
    resource?: string;
}