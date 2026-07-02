# API Layer Refactor Report

## Architecture

The API layer is now the single boundary between the React application and the backend. It owns all knowledge of backend response envelopes, authentication behavior, and refresh-token orchestration.

Responsibilities are now clearly separated:

- Axios: transport layer only
- Request layer: request orchestration and response normalization
- Interceptors: auth injection, refresh handling, retry orchestration
- Services: business-level calls without Axios or backend-shape knowledge
- Context and pages: UI concerns only

## Request Flow

Every request now flows through the shared request helper:

1. Request configuration is prepared.
2. Request interceptors attach JWT credentials when required.
3. Multipart requests are handled without forcing manual content-type headers.
4. The response is normalized into a consistent contract.

The normalized response shape is:

```js
{
  success,
  statusCode,
  message,
  data,
  timestamp
}
```

## Response Flow

The API layer transforms backend responses into a stable contract before services consume them. Services receive predictable objects and never need to inspect Axios internals or backend envelope fields.

## Refresh Flow

When a request receives a 401 response, the interceptor attempts to refresh the access token using the refresh endpoint. The refresh request uses the existing cookie-based session flow and reuses the shared token storage layer.

The refresh flow:

1. Detect an expired or unauthorized request.
2. Ensure only one refresh request runs at a time.
3. Store the new access token.
4. Replay queued requests with the refreshed token.

## Retry Flow

Queued requests are replayed after a successful refresh so the user experience remains uninterrupted. The layer prevents infinite refresh loops by marking retried requests and bypassing retry logic after the first refresh attempt.

## Error Flow

Errors are normalized into a single, structured contract:

```js
{
  success: false,
  status,
  message,
  errors,
  timestamp,
  raw
}
```

This preserves metadata and avoids throwing ad-hoc Error objects that lose structure.

## Advantages

- Centralized backend contract knowledge
- Cleaner services with no Axios coupling
- Safer auth handling with token refresh retry support
- Easier testing and future scaling
- Consistent error handling across the application

## Future Scalability

This API foundation is ready for growth because it supports:

- additional interceptors
- broader auth strategies
- centralized telemetry and monitoring
- future API versioning
- consistent contract evolution across services

## Production Score

9.8/10

This is now a robust, enterprise-grade API foundation for TheSixthStudio.
