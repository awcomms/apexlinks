<script>
  export let setPrompt = "Set image";
  export let changePrompt = "Change image";
  export let image = "";

  import { ButtonSet, FileUploaderButton } from "carbon-components-svelte";

  let labelText = setPrompt;
  let isImgErr;
  let imageRef;
  let imgRef;

  $: image ? (labelText = setPrompt) : changePrompt;

  $: if (!image) {
    labelText = labelText;
  } else {
    labelText = "Change Image";
  }

  $: if (imgRef) {
    imgRef.src = image;
  }

  const imageChange = () => {
    let file = imageRef.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      image = e.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
</script>

{#if isImgErr}
  <p>Image Error</p>
{/if}

{#if !isImgErr && image}
  <img
    style="width: 137px;"
    width="100%"
    heigth="100%"
    alt="display"
    src=""
    bind:this={imgRef}
  />
{/if}

<ButtonSet stacked>
  <FileUploaderButton
    disableLabelChanges
    on:change={imageChange}
    bind:ref={imageRef}
    {labelText}
  />
  <slot />
</ButtonSet>
