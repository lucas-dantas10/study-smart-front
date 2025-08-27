import DOMPurify from 'dompurify';

export function setupTrustedTypes() {
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        window.trustedTypes.createPolicy('default', {
            createHTML: (string) => DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
            createScriptURL: string => string,
            createScript: string => string,
        });
    }
}
