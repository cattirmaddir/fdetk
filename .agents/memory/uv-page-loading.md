---
name: UV page loading
description: The UV browser handler expects to run inside a proxied /service URL, not on the public homepage.
---

The homepage should load only the UV bundle/config needed to encode a destination and register the service worker. It must not execute the UV handler there; the handler initializes against the current URL and can throw an invalid-URL error when the current page is the unproxied homepage.

**Why:** Loading the handler on the homepage caused the search flow to appear inert even though the only visible console errors initially looked like unrelated ad warnings.

**How to apply:** Keep destination handler loading in the proxied-page injection path. When debugging a dead search submit, first check for handler initialization errors before investigating the target site.