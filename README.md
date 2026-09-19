<div align="center">

# Welcome to Snorlax's Cave!
Snorlax's Cave is a UV-powered proxy and game site for local hosting and Replit deployments. Built for the v2.0 release.

</div>

## We offer:
- Many unblocked apps & games
- Built-in web proxy
- Free emulator access
- Customizable settings and portal flow
- Replit-ready startup configuration

## Join our community!
<a align="center" href="https://discord.gg/Cqaa8x82Ch">
    <img src="https://invidget.switchblade.xyz/Cqaa8x82Ch?theme=dark"/>
</a>

## Local hosting

### 1) Clone the repository
```bash
git clone https://github.com/cattirmaddir/fdetk.git
```

### 2) Navigate into the project folder
```bash
cd fdetk
```

### 3) Install dependencies
This project uses pnpm workspaces.

```bash
pnpm install
```

### 4) Start the app
The server expects a `PORT` environment variable before it starts.

Windows PowerShell:
```powershell
$env:PORT = "5000"
pnpm run start:snorlax
```

Linux/macOS:
```bash
export PORT=5000
pnpm run start:snorlax
```

The app should be available at:
```text
http://localhost:5000/
```

### 5) Replit startup
This repo already includes a Replit config that runs:

```bash
pnpm run start:snorlax
```

If you are using Replit, make sure the project is set to the workspace root and that `PORT` is provided by the platform automatically.

## Important setup notes
- `PORT` is required for the API server and Bare proxy layer.
- The app serves the static site and proxy routes from the API server.
- Some sites like GeForce NOW and NVIDIA sign-in flows are intentionally treated as direct external links because UV rewriting breaks their browser/media requirements.
- The UI has been left intact; this is a backend/runtime fix project.

## Hosting / deployment
This repo is configured for a Node + pnpm runtime and is designed to run correctly in Replit, local development, and similar Node hosting platforms.

### Replit
- Open the project in Replit
- Run the project using the existing config
- Keep the workspace root as the project root
- Let Replit supply `PORT`

### Manual Node hosting
```bash
pnpm install
export PORT=5000
pnpm run start:snorlax
```

## Support us
**[SUPPORT US!](https://patreon.com/SnorlaxCave)**
