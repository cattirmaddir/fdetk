---
name: Bare proxy limiter
description: The Bare server limiter counts keep-alive requests per client IP, which shared preview proxies can exhaust quickly.
---

The Bare server's connection limiter is request-rate based rather than a count of currently open sockets. Shared Replit preview traffic can make many browser asset requests appear under one IP, so a low default limit causes proxy pages to show skeletons or missing challenge assets.

**Why:** Complex sites such as YouTube load many scripts, thumbnails, API calls, and challenge resources in a short window.

**How to apply:** Size the limiter for realistic proxied page loads and preserve a cooldown; verify with repeated keep-alive requests after changing it.