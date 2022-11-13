<script lang="ts">
  import { createEventDispatcher } from "svelte";

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
      <button class="edit-button" on:click={toggleEdit}>編集</button>
      <button class="remove-button" on:click={remove}>削除</button>
    </div>
  {:else}
    <textarea class="editor" bind:value={sentence} />
    <div class="quit">
      <button class="quit-button" on:click={toggleEdit}>終わる</button>
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
