<script>
    export let image
    export let files

    import {placeholder} from 'placeholder'

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
    let imagesRef
    let imageRef
    let imgRef
    let open

    $: if (!image){
        image = placeholder
    }

    $: if (imgRef) imgRef.src = image

    let openGallery = (f) => {
        file = f
        open = true
        f.ref.scrollIntoView()
    }

    let imagesNext = () => {
        file = files[files.indexOf(file)+1]
        file.ref.scrollIntoView()
    }

    let imagesPrev = () => {
        file = files[files.indexOf(file)-1]
        file.ref.scrollIntoView()
    }

    let delFile = (file) => {
        files = files.filter(f => f != file)
    }

    let imageChange = () => {
        let i = imageRef.files[0]
        var reader = new FileReader()
        reader.onload = (e) => {
            image = e.target.result
        }
        if (i){
            reader.readAsDataURL(i)
        }
    }

    let imagesChange = (e) => {
        let prevLength = files.length
        let x = imagesRef.files
        for (let i=0; i<x.length; i++){
            let f = x[i]
            let _file = {file: f, name: f.name, ref: null, status: 'uploading'}
            if (!files.includes(_file)){
                files = [...files, _file]
            }
        }
        for (let i = files.length-1; i > prevLength-1; i--){
            let f = files[i]
            let reader = new FileReader()
            reader.onload = (e) => {
                f.url = e.target.result
                f.status = 'complete'
                delete f.file
                files[i] = f
            }
            reader.readAsDataURL(f.file)
        }
    }
</script>

<FSBox
    on:down={imagesPrev}
    bind:url={file.url}
    on:up={imagesNext}
    bind:open
/>

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

<Row noGutter>
    <Column>
        <ButtonSet stacked>
            <FileUploaderButton 
                disableLabelChanges 
                on:change={imageChange} 
                bind:ref={imageRef} 
                labelText='Change image'
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

{#each files as f}
    <Row>
        <FileItem
            on:click={openGallery(f)}
            bind:status={f.status}
            name={f.name}
        />
        <Button
            tooltipAlignment='center'
            on:click={delFile(f)}
            tooltipPosition='bottom'
            iconDescription='Delete'
            icon={Delete16}
            kind='ghost'
            hasIconOnly
        />
    </Row>
{/each}