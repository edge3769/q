<script>
    import {
        Tag,
        Row,
        Link,
        Search,
        Column,
        PaginationNav
    } from 'carbon-components-svelte'
    import * as api from 'api'
    import { 
        userTags
    } from '../stores.js'
    import { onMount } from 'svelte';

    onMount(()=>{
        ref.focus()
    })

    let users = []
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
        if (tag != '' && !$userTags.includes(tag)){
            $userTags = [...$userTags, tag]
            open=true
        }
    }

    let delTag = (tag) => {
        $userTags=$userTags.filter(t => t != tag)
        get()
    }

    let clear = () => {
        $userTags = []
        open = false
    }

    let get = async function(){
        let tagString = JSON.stringify($userTags)
        let url = `users?tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        users = res.items
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
            on:focus={() => (current=ref)}
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
            {#each $userTags as tag}
                <Tag filter on:click={delTag(tag)}>{tag}</Tag>
            {/each}
        </Column>
    </Row>
{/if}

{#each users as user}
    <br />
    <Row noGutter>
        <div>
            {#if user.image}
                <img style='vertical-align: top;' height='37px' width='37px' alt='profile pic' src={user.image}>
            {:else}
                <img style='vertical-align: top;' height='37px' width='37px' alt='profile pic' src='/placeholder.png'>
            {/if}
            <Link href='{user.username}'>{user.name}</Link>
        </div>
    </Row>
    {/each}

<!--08168080932 - Whatsapp
    08032146531 - Normal -->

{#if got && total < 1}
<div>
    <p>There don't seem to be any results</p>
</div>
{/if}

{#if total>10}
    <PaginationNav loop bind:page bind:total={pages}/>
{/if}