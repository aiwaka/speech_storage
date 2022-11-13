<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ButtonUi from "./ButtonUi.svelte";

  export let sentence: string;
  export let idx: number;

  $: editting = false;

  const toggleEdit = () => {
    editting = !editting;
  };
  const dispatch = createEventDispatcher();
  const remove = () => {
    dispatch("remove", { idx: idx });
  };
</script>

<div class="box">
  {#if !editting}
    <div class="text">
      {sentence}
    </div>
    <div class="edit">
      <ButtonUi clickCallback={toggleEdit}>編集</ButtonUi>
      <ButtonUi clickCallback={remove}>x</ButtonUi>
    </div>
  {:else}
    <textarea class="editor" bind:value={sentence} />
    <div class="quit">
      <ButtonUi clickCallback={toggleEdit}>終了</ButtonUi>
    </div>
  {/if}
</div>

<style>
  .box {
    border: 1px solid #444;
    border-radius: 3px;
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
    margin: 0.8rem auto;
  }
</style>
