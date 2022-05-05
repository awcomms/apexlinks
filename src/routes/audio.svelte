<script>
    let audio
    let input
    let value

    $: if (input && input.files[0]) {
        console.log('zee')
        audio.src = input.files[0]
    }

    setInterval(() => {
        audio.load()
        audio.play()
    }, value * 1000);
</script>

<input type='number' bind:value>
<input bind:this={input} type='file'>
<audio bind:this={audio} />