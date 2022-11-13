<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let recognition: SpeechRecognition | null;
  $: recognition = null;
  $: recognizing = false;
  $: recordButtonValue = "record";
  $: recordText = "";
  if (browser) {
    const { webkitSpeechRecognition } = window as any;
    onMount(() => {
      const rec: SpeechRecognition = new webkitSpeechRecognition();
      rec.lang = "ja-JP";
      // rec.continuous = true;
      rec.onresult = recognizeSpeech;
      recognition = rec;
    });
  }

  const record = () => {
    if (recognition) {
      if (recognizing) {
        recognition.stop();
        recordButtonValue = "record";
      } else {
        recognition.start();
        recordButtonValue = "stop";
      }
      recognizing = !recognizing;
      // console.log(recognition);
    }
  };
  const recognizeSpeech = (e: SpeechRecognitionEvent) => {
    for (const res of e.results) {
      for (const part of res) {
        console.log(part.transcript);
      }
    }
    recordText += `${e.results[e.results.length - 1][0].transcript}\n`;
  };
</script>

<div class="home">
  <div class="recognition">
    <button class="record-btn" on:click={record}>{recordButtonValue}</button>
    <div>
      <textarea class="recorded-text" value={recordText} />
    </div>
  </div>
</div>
