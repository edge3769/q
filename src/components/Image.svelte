<script>
    export let image = ''

    import {
        Row,
        Column,
        ButtonSet,
        FileUploaderButton
    } from 'carbon-components-svelte'

    let isImgErr
    let imageRef
    let imgRef
    let labelText

    $: if(!image){
        labelText = 'Set Image'
    } else {
        labelText = 'Change Image'
    }

    $: if(imgRef) {
        imgRef.src = image
    }

    const imageChange = () => {
        let file = imageRef.files[0]
        var reader = new FileReader()
        reader.onload=(e)=>{
            image = e.target.result
        }
        if (file){
            reader.readAsDataURL(file)
        }
    }
</script>

{#if isImgErr}
    <p>Image Error</p>
{/if}

{#if !isImgErr && image}
    <Row noGutter>
        <Column>
            <img
                style='width: 137px;'
                width=100% heigth=100%
                alt='display'
                src=''
                bind:this={imgRef}
            >
        </Column>
    </Row>
{/if}

<Row noGutter>
    <Column>
        <ButtonSet stacked>
            <FileUploaderButton 
                disableLabelChanges 
                on:change={imageChange} 
                bind:ref={imageRef} 
                labelText={labelText}
            />
        </ButtonSet>
    </Column>
</Row>