<script>
  import Header from "./Header.svelte";
</script>

<Header />

<div class="contents">
  <slot />
</div>

<style>
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
