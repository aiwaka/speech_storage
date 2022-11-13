<script lang="ts">
  export let clickCallback: () => void;
  export let disabled = false;
</script>

<button class="button-ui" {disabled} on:click={clickCallback}>
  <slot />
</button>

<style>
  .button-ui {
    margin: 0.3rem 0.5rem;
    padding: 0.3rem 1.5rem;
    border: 1px solid #999;
    border-radius: 12px;
    transition: 0.25s ease-out;
  }
  .button-ui[disabled] {
    color: #666;
  }
  .button-ui:not([disabled]):hover {
    color: white;
    background-color: #444;
  }
</style>
