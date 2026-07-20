<script lang="ts">
  import { sounds } from "../data/sounds";
  import { audioStore } from "../stores/audio";
  import SoundCard from "./SoundCard.svelte";
  import type { SoundState } from "../types/sound";

  let states = $state<Record<string, SoundState>>({});

  audioStore.subscribe((store) => {
    states = store.states;
  });
</script>

<div class="grid grid-cols-3 md:grid-cols-6 gap-3 p-3 md:gap-4 md:p-4">
  {#each sounds as sound (sound.id)}
    <SoundCard
      {sound}
      state={states[sound.id] ?? { playing: false, volume: 50 }}
    />
  {/each}
</div>
