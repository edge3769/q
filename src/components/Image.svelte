<script>
    export let image
    export let files

    import {
        Row,
        Column,
        Button,
        ButtonSet,
        FileUploaderButton
    } from 'carbon-components-svelte'
    import FSBox from './FSBox.svelte'
    import FileItem from './File/FileItem.svelte'
    import Delete16 from 'carbon-icons-svelte/lib/Delete16'

    let file = {}
    let isImgErr
    let imagesRef
    let imageRef
    let imgRef
    let labelText
    let open

    $: if(!image){
        labelText = 'Add Image'
    } else {
        labelText = 'Change Image'
    }

    $: if(imgRef) {
        imgRef.src = image
    }

    const openGallery = (f) => {
        file = f
        open = true
        f.ref.scrollIntoView()
    }

    const imagesNext = () => {
        file = files[files.indexOf(file)+1]
        file.ref.scrollIntoView()
    }

    const imagesPrev = () => {
        file = files[files.indexOf(file)-1]
        file.ref.scrollIntoView()
    }

    const delFile = (file) => {
        files = files.filter(f => f != file)
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
            <!-- <FileUploaderButton
                labelText='Add to images' 
                on:change={imagesChange}
                bind:ref={imagesRef}
                disableLabelChanges
                multiple
            /> -->
        </ButtonSet>
    </Column>
</Row>