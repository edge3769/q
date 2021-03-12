<script>
    import {
        Tag,
        Row,
        Link,
        Search,
        Column,
        RadioButton,
        PaginationNav,
        RadioButtonGroup
    } from 'carbon-components-svelte'
    import * as api from 'api'
    import {
        itype,
        itemTags
    } from '../stores.js'

    $itype='all'
    $:get($itype)

    let items = []
    let page = 0
    let total = 0
    let pages = 0

    let current

    let open = false
    let got
    let tag
    let ref

    let keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (current==ref){
                    addTag()
                    get()
                }
        }
    }

    let addTag = () => {
        if (tag != '' && !$itemTags.includes(tag)){
            $itemTags=[...$itemTags, tag]
            open=true
            tag=''
        }
    }

    let delTag = (tag) => {
        $itemTags=$itemTags.filter(t => t != tag)
        get()
    }

    let clear = () => {
        $itemTags = []
        open = false
    }

    let get = async function(){
        let tagString = JSON.stringify($itemTags)
        let url = `items?tags=${tagString}&visible=1&page=${page+1}`
        if ($itype != 'all') url = url + '&itype=' + $itype
        let res = await api.get(url)
        items = res.items
        total = res.total
        pages = res.pages
        got = true

    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
    <title>Marketlinks</title>
</svelte:head>

<Row noGutter>
    <Column>
        <Search
            on:focus={() => {current=ref}}
            bind:value={tag}
            bind:ref
        />
    </Column>
</Row>

{#if open}
    <Row noGutter>
        <Column>
            <Tag
                on:click={clear}
                type='magenta'
            >
                Clear
            </Tag>
            {#each $itemTags as tag}
                <Tag filter on:click={delTag(tag)}>{tag}</Tag>
            {/each}
        </Column>
    </Row>
{/if}

<Row noGutter>
    <Column>
        <RadioButtonGroup bind:selected={$itype}>
            <RadioButton labelText='All' value='all' />
            <RadioButton labelText='Products' value='product' />
            <RadioButton labelText='Services' value='service' />
        </RadioButtonGroup>
    </Column>
</Row>

{#each items as item}
    <br />
    <Row noGutter>
        <div>
            {#if item.image}
                <img style='vertical-align: top;' height='37px' width='37px' alt='profile pic' src={item.image}>
            {:else}
                <img style='vertical-align: top;' height='37px' width='37px' alt='profile pic' src='/placeholder.png'>
            {/if}
            <Link href='item/{item.id}'>{item.name}</Link>
        </div>
    </Row>
{/each}

<!--08168080932 - Whatsapp
    08032146531 - Normal -->

{#if got && total < 1}
    <Row noGutter>
        <Column>
            <p>There don't seem to be any results</p>        
        </Column>
    </Row>
{/if}

{#if total>10}
    <Row noGutter>
        <Column>
            <PaginationNav loop bind:page bind:total={pages}/>
        </Column>
    </Row>
{/if}