<script lang="ts">
  import { page } from "$app/stores";
</script>

<header><h1>Speech Storage</h1></header>

<div class="nav-container">
  <nav>
    <span class="page-link" aria-current={$page.url.pathname === "/" ? "page" : undefined}>
      <a href="/">ホーム</a>
    </span>
    <span class="page-link" aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
      <a href="/about">使い方</a>
    </span>
  </nav>
</div>

<style>
  a {
    color: inherit;
    text-decoration: none;
  }
  .nav-container {
    width: fit-content;
    margin: 0 auto;
  }
  .page-link {
    margin: 0.5rem 1rem;
    padding: 0.3rem 1rem;
  }
  .page-link[aria-current="page"] {
    background-color: pink;
  }
  .page-link[aria-current="page"]::before {
    content: "";
    width: 100%;
    height: 0.2rem;
    background: black;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transition: 0.25s ease-out;
  }

  a:hover {
    color: salmon;
  }
</style>
