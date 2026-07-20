<script lang="ts">
  import type { Sound } from "../types/sound";
  import type { SoundState } from "../types/sound";
  import { audioStore } from "../stores/audio";

  let {
    sound,
    state: soundState = { playing: false, volume: 50 },
  }: { sound: Sound; state?: SoundState } = $props();
  let iconFailed = $state(false);

  function handleClick() {
    audioStore.toggle(sound.id);
  }

  function handleSliderInput(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    audioStore.setVolume(sound.id, parseInt(target.value, 10));
  }
</script>

<button
  onclick={handleClick}
  class="relative flex flex-col items-center justify-between p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-blue-500"
  class:ring-2={soundState.playing}
  class:ring-blue-400={soundState.playing}
  class:dark:ring-blue-500={soundState.playing}
>
  {#if soundState.playing}
    <span
      class="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"
    ></span>
  {/if}

  <div class="flex flex-col items-center gap-3 mt-2">
    <div
      class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xl select-none overflow-hidden"
    >
      {#if iconFailed}
        <span>{sound.title.charAt(0)}</span>
      {:else}
        <img
          src={sound.icon}
          alt=""
          class="w-7 h-7 object-contain"
          onerror={() => (iconFailed = true)}
        />
      {/if}
    </div>
    <span
      class="text-sm font-medium text-gray-700 dark:text-gray-300 select-none"
    >
      {sound.title}
    </span>
  </div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="w-full mt-4 px-1"
    onclick={(e: Event) => e.stopPropagation()}
    onkeydown={() => {}}
  >
    <input
      type="range"
      min="0"
      max="100"
      value={soundState.volume}
      oninput={handleSliderInput}
      class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-600 accent-blue-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-sm"
    />
  </div>
</button>
