# AuthModal Type Fix Implementation Plan

## Problem
The `AuthModal` component was encountering a TypeScript error: `Expected 0 arguments, but got 1` when calling `handleGoogleSignIn`. This occurred because `handleGoogleSignIn` was defined as taking no arguments, but was being called with the Google credential string from the `GoogleLogin` component.

## Solution
Update `handleGoogleSignIn` function signature to accept `credential?: string` and pass it to the `signInWithGoogle` function from `useAuth` hook.

## Changes
### `app/src/components/custom/AuthModal.tsx`
- Modified `handleGoogleSignIn` function signature to accept `credential?: string`.
- Updated the call to `signInWithGoogle` inside `handleGoogleSignIn` to pass the `credential`.

## Verification
- Verify that the TypeScript error is resolved.
- Ensure that the credential string is correctly passed through to the authentication context.
