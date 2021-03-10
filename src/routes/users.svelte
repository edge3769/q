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
        //tags,
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
    let tags=[]
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
        if (tag != '' && !tags.includes(tag)){
            tags = [...tags, tag]
            open=true
        }
    }

    let delTag = (tag) => {
        tags=tags.filter(t => t != tag)
        get()
    }

    let clear = () => {
        tags = []
        open = false
    }

    let get = async function(){
        console.log('get')
        let tagString = JSON.stringify(tags)
        let url = `users?tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        users = res.items
        console.log(users)
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
            placeholder='Add tag'
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
            {#each tags as tag}
                <Tag filter on:click={delTag(tag)}>{tag}</Tag>
            {/each}
        </Column>
    </Row>
{/if}

{#each users as user}
    <Row noGutter>
        <div>
            {#if user.image}
                <img style='vertical-align: middle;' height='37px' width='37px' alt='profile pic' src={user.image}>
            {:else}
                <img style='vertical-align: middle;' height='37px' width='37px' alt='profile pic' src='/placeholder.png'>
            {/if}
            <Link href='{user.username}'>{user.name}</Link>
        </div>
    </Row>
    <br/>
    {/each}

<!--08168080932 - Whatsapp
    08032146531 - Normal -->

{#if got && total < 1}
<div>
    <p>There don't seem to be any results for that</p>
</div>
{/if}

{#if total>10}
    <PaginationNav loop bind:page bind:total={pages}/>
{/if}