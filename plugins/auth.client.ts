import { Auth0Client } from '@auth0/auth0-spa-js';

export default defineNuxtPlugin((nuxtApp) => {
    const auth0 = new Auth0Client({
        domain: 'your-app.auth0.com',
        clientId: 'your-client-id',            // Replace with your Auth0 client ID
        authorizationParams: {
            redirect_uri: window.location.origin,  // Set the redirect URI
            audience: 'https://your-api-url.com/'  // Optional, for API access if needed
        }
    });

    nuxtApp.provide('auth0', auth0);
});
