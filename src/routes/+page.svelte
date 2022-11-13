<script lang="ts">
  import { browser } from "$app/environment";
  import SentenceCard from "@/SentenceCard.svelte";
  import { onMount } from "svelte";

  // eslint-disable-next-line no-undef
  let recognition: SpeechRecognition | null;
  $: recognizing = false;
  $: recordButtonValue = "録音する";
  $: recordText = "";
  if (browser) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { webkitSpeechRecognition } = window as any;
    onMount(() => {
      // eslint-disable-next-line no-undef
      const rec: SpeechRecognition = new webkitSpeechRecognition();
      rec.lang = "ja-JP";
      // rec.continuous = true;
      rec.onresult = recognizeSpeech;
      recognition = rec;
    });
  }

  // const startRecord = () => {
  //   if (recognition && recogni) {

  //   }
  // }
  const record = () => {
    if (recognition) {
      if (recognizing) {
        recognition.stop();
        recordButtonValue = "録音する";
      } else {
        recognition.start();
        recordButtonValue = "録音をやめる";
      }
      recognizing = !recognizing;
      // console.log(recognition);
    }
  };
  // eslint-disable-next-line no-undef
  const recognizeSpeech = (e: SpeechRecognitionEvent) => {
    const text = `${e.results[e.results.length - 1][0].transcript}\n`;
    recordText += text;
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

<div class="app">
  <header><h1>Speech Storage</h1></header>
  <div class="contents">
    <div class="recognition">
      <button class="record-button" on:click={record}>{recordButtonValue}</button>
    </div>
    <div class="card-container">
      {#each sentenceList as sentence, idx (idx)}
        <SentenceCard {sentence} {idx} on:remove={removeCard} />
      {/each}
    </div>
  </div>
</div>

<style>
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card-container {
    width: 90%;
    margin: auto;
  }

  .record-button {
    width: 6rem;
    height: 6rem;
    border-radius: 6rem;
    border: 2px solid #999;
  }
  .record-button:hover {
    background-color: #444;
    color: white;
    transition: all 0.2s ease-in-out;
  }
</style>
