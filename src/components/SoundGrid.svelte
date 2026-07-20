<script lang="ts">
  import { sounds } from "../data/sounds";
  import { audioStore } from "../stores/audio";
  import SoundCard from "./SoundCard.svelte";
</script>

<div class="grid grid-cols-2 md:grid-cols-6 gap-3 p-3 md:gap-4 md:p-4">
  {#each sounds as sound (sound.id)}
    <SoundCard
      {sound}
      state={$audioStore.states[sound.id] ?? { playing: false, volume: 50 }}
    />
  {/each}
</div>
