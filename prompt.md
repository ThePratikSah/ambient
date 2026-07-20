# MASTER PROMPT

---

# Project

Build a production-quality, extremely minimal ambient sound PWA application.

The application should feel like a native operating system utility rather than a traditional application.

The application is completely offline.

No backend.

No authentication.

No analytics.

No telemetry.

No accounts.

No cloud.

No advertisements.

Everything is local.

---

# Tech Stack

Use exactly the following stack.

Frontend

- Svelte 5
- Vite
- TailwindCSS - npm install tailwindcss @tailwindcss/vite

```javascript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});
```

- CSS file

```css
@import "tailwindcss";
```

- run - npm run dev

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/src/style.css" rel="stylesheet" />
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </body>
</html>
```

- TypeScript

use this command to create svelt project

npm create vite@latest . -- --template svelte-ts

Audio

- Howler.js - npm install howler

State

- Svelte stores only

No routing.

No SvelteKit.

No React.

No Vue.

No Angular.

No Bootstrap.

No ShadCN.

No DaisyUI.

No Flowbite.

No component libraries.

No icon libraries.

No animation libraries.

No state libraries.

No unnecessary dependencies.

Use only what is absolutely required.

Don't write package versions on your own, do manual install of packages with no specified versions

---

# Design Philosophy

The application should feel like:

- Raycast
- Native macOS utilities
- Minimal
- Fast
- Lightweight

Everything should open instantly.

No splash screen.

No loading screen.

No startup animation.

No unnecessary transitions.

The application should consume as little RAM and CPU as possible.

---

# Folder Structure

Create a clean scalable architecture.

```
src/

components/
    SoundGrid.svelte
    SoundCard.svelte
    TimerMenu.svelte
    ThemeToggle.svelte

stores/
    audio.ts
    settings.ts

lib/
    audio.ts
    timer.ts

data/
    sounds.ts

types/
    sound.ts

App.svelte

main.ts
```

No unnecessary folders.

No pages folder.

No routes.

No layouts.

No assets inside src.

Static assets belong inside public.

---

# Public Folder

```
public/

audio/

icons/

manifest/

```

Do not include actual assets.

Use placeholders.

Assume audio files exist. If not, show no audio file.

Example

```
audio/

rain.mp3

fire.mp3

train.mp3

coffee.mp3
```

Do not generate SVGs.

Do not generate icons.

Use placeholder paths only.

---

# Grid Layout

The UI is only a responsive grid.

No sidebars.

No navigation.

No tabs.

No pages.

No modals.

No dialogs.

No dashboard.

No settings page.

Everything exists on one screen.

Grid should automatically calculate columns.

Example

```
1 column

2 columns

3 columns

4 columns

5 columns

based on width
```

Cards automatically resize.

No horizontal scrolling.

Only vertical scrolling if necessary.

---

# Sound Card

Every sound card contains only:

Top

Placeholder Icon

Title

Bottom

Volume Slider

Nothing else.

No play button.

No stop button.

No switches.

The interaction is:

Click anywhere on card.

If stopped

→ Fade in
→ Start loop

If playing

→ Fade out
→ Stop

Slider controls volume only. Just a small Ripple effect dot on top right corner to show if that grid is playing.

---

# Audio Behaviour

Every sound uses an independent Howler instance.

Requirements

Loop forever.

Preload audio.

Lazy initialize only when first played.

Allow unlimited simultaneous sounds.

Example

Rain

-

Thunder

-

Train

-

Fire

All can play together.

Each maintains independent volume.

Each remembers its own state.

---

# Fade Behaviour

Starting

Volume

0

↓

Target volume

Within 1.5 seconds.

Stopping

Current volume

↓

0

Within 1.5 seconds.

Only after fade completes

Stop playback.

No abrupt stopping.

---

# Volume

Each card contains one slider.

Range

0

↓

100

Persist volume.

Changing volume while playing updates immediately.

Changing volume while paused simply stores value.

---

# Persistence

Persist using localStorage.

Remember

Theme

Playing sounds

Volume

Window size

Timer selection

Last opened

Do not use IndexedDB.

Do not use databases.

---

# Auto Resume

When reopening application

Volumes restored.

---

# Theme

Support

Light

Dark

Toggle exists in top toolbar.

No settings page.

Follow system theme on first launch.

Persist afterwards.

---

# Top Toolbar

Minimal.

Contains only

Application title

Spacer

Theme toggle

Nothing else.

---

# Animations

Very subtle.

Use only CSS transitions.

No animation libraries.

No bouncing.

No scaling.

No exaggerated effects.

---

# Performance

App must idle at nearly zero CPU.

Audio engine should not continuously recreate objects.

Reuse Howler instances.

Destroy unused instances.

Avoid unnecessary reactivity.

No unnecessary rerenders.

---

# Responsive Behaviour

Grid auto adjusts.

Example

350px

1 column

600px

2 columns

900px

4 columns

No hardcoded values.

Use CSS Grid.

---

# Tailwind

Enable

Tree shaking

Purge unused styles

No global utility spam.

Keep generated CSS extremely small.

---

# TypeScript

Strict mode.

No any.

Use interfaces.

Proper types everywhere.

---

# Code Quality

Use

Reusable functions.

Readable names.

No duplicated code.

No magic numbers.

No deeply nested components.

Minimal abstractions.

---

# Audio Manager

Create a reusable AudioManager.

Responsibilities

Create Howler objects.

Play.

Pause.

Fade.

Volume.

Loop.

Persistence.

Cleanup.

No component should directly manipulate Howler.

---

# Data Source

Create

```
sounds.ts
```

Example

```ts
[
  {
    id: "rain",
    title: "Rain",
    icon: "/icons/rain.svg",
    audio: "/audio/rain.mp3",
  },
];
```

No hardcoded sounds inside components.

---

# Error Handling

If audio missing

Display disabled card.

Never crash.

Log meaningful errors.

---

# Styling

Rounded cards.

Subtle shadows.

Native feeling.

Soft borders.

No glassmorphism.

No gradients.

No colorful UI.

Neutral colors only.

---

# Future Extensibility

Architecture should allow adding

- Search
- Favorites
- Categories
- Sound packs
- Import custom sounds
- Sleep schedule
- Keyboard shortcuts
- Multiple profiles

without requiring major refactoring.

DO NOT implement these features now.

---

# Deliverables

Generate:

- Complete project structure
- Fully working code
- Vite configuration
- Tailwind configuration
- TypeScript configuration
- AudioManager
- Stores
- Components
- Responsive grid
- Persistent settings
- Timer implementation
- Theme implementation
- Build instructions
- Development instructions
- Production build instructions
- Clean, commented code

---

# Non-Goals

Do **not** implement:

- User accounts
- Cloud sync
- Analytics
- Telemetry
- Backend APIs
- Database
- Notifications
- Ads
- Online audio streaming
- Download manager
- Settings page
- Multiple windows
- Routing
- Plugin system
- Premium features
- AI features

The application should remain a **single-purpose utility**: open from the menu bar/system tray, show a responsive grid of ambient sounds, let users start/stop looping sounds with smooth fades, adjust per-sound volume, set an optional sleep timer, switch between light and dark themes, and remember state across launches—all while remaining fast, lightweight, offline-first, and minimal.
