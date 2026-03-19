require('dotenv').config();
const { createClerkClient } = require('@clerk/backend');

console.log('Auth Middleware - Initializing Clerk with keys:', { 
    hasSecret: !!process.env.CLERK_SECRET_KEY, 
    hasPublishable: !!process.env.CLERK_PUBLISHABLE_KEY 
});

const clerkClient = createClerkClient({ 
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY
});

const auth = async (req, res, next) => {
    try {
        // Construct full URL because Clerk needs it to verify the request origin/state
        // Express req.url might be relative if inside a router. req.originalUrl is the full path.
        const protocol = req.protocol || 'http';
        const host = req.get('host');
        const fullUrl = `${protocol}://${host}${req.originalUrl}`;

        // Create a Headers object from req.headers (Clerk/Backend expects standardized headers)
        const headers = new Headers();
        Object.entries(req.headers).forEach(([key, value]) => {
            if (value) {
                if (Array.isArray(value)) {
                    value.forEach(v => headers.append(key, v));
                } else {
                    headers.set(key, value);
                }
            }
        });

        const requestState = await clerkClient.authenticateRequest({
            url: fullUrl,
            method: req.method,
            headers: headers
        });
        
        if (requestState.isSignedIn) {
            const auth = requestState.toAuth();
            req.user = {
                ...auth,
                id: auth.userId // Map for compatibility
            };
            next();
        } else {
            console.warn('Auth Middleware - Authentication failed:', requestState.reason);
            return res.status(401).json({ 
                message: 'Unauthorized', 
                reason: requestState.reason,
                status: requestState.status
            });
        }
    } catch (error) {
        console.error('Clerk Auth Error detailed:', error);
        res.status(500).json({ 
            message: 'Internal Server Error during authentication',
            error: error.message,
            stack: error.stack
        });
    }
};

module.exports = auth;

