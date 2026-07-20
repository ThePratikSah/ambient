<script lang="ts">
  import { onMount } from "svelte";
  import SoundGrid from "./components/SoundGrid.svelte";
  import ThemeToggle from "./components/ThemeToggle.svelte";
  import { audioStore } from "./stores/audio";

  onMount(() => {
    audioStore.restore();

    return () => {
      audioStore.stopAll();
    };
  });
</script>

<div
  class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
>
  <header
    class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800"
  >
    <div class="flex items-center gap-4">
      <h1 class="text-base font-semibold tracking-tight select-none">
        Ambient
      </h1>
    </div>
    <ThemeToggle />
  </header>

  <main>
    <SoundGrid />
  </main>
</div>
