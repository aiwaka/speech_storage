<script lang="ts">
  import { browser } from "$app/environment";
  import SentenceCard from "@/SentenceCard.svelte";
  import { onMount } from "svelte";

  // eslint-disable-next-line no-undef
  let recognition: SpeechRecognition | null;
  $: recognizing = false;
  if (browser) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { webkitSpeechRecognition } = window as any;
    onMount(() => {
      // eslint-disable-next-line no-undef
      const rec: SpeechRecognition = new webkitSpeechRecognition();
      rec.lang = "ja-JP";
      rec.onresult = recognizeSpeech;
      recognition = rec;
    });
  }

  const startRecord = () => {
    if (recognition && !recognizing) {
      console.log("start");
      recognition.start();
      recognizing = true;
    }
  };
  const stopRecord = () => {
    if (recognition && recognizing) {
      console.log("end");
      recognition.stop();
      recognizing = false;
    }
  };
  // eslint-disable-next-line no-undef
  const recognizeSpeech = (e: SpeechRecognitionEvent) => {
    const text = `${e.results[e.results.length - 1][0].transcript}\n`;
    console.log(text);
    sentenceList.push(text);
    sentenceList = sentenceList;
  };

  let sentenceList: string[] = [];
  $: sentenceList = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeCard = (ev: CustomEvent<{ idx: number }>) => {
    sentenceList.splice(ev.detail.idx, 1);
    sentenceList = sentenceList;
  };
</script>

<div class="recognition">
  <button class="record-button" on:pointerdown={startRecord} on:pointerup={stopRecord}>
    録音
  </button>
</div>
{#if sentenceList.length}
  <div class="card-container">
    {#each sentenceList as sentence, idx (idx)}
      <SentenceCard {sentence} {idx} on:remove={removeCard} />
    {/each}
  </div>
{:else}
  <div class="no-record-text">録音したテキストはありません。</div>
{/if}

<style>
  .card-container {
    width: 90%;
    margin: auto;
  }

  .record-button {
    width: 6rem;
    height: 6rem;
    border-radius: 6rem;
    border: 2px solid #999;
    margin: 2rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .record-button:hover {
    background-color: #444;
    color: white;
    transition: all 0.2s ease-in-out;
  }
  .record-button:active {
    background-color: salmon;
  }
</style>
