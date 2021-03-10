<script context='module'>
    export async function preload({params}, {user}){
        let {id} = params
        let tagString = JSON.stringify([])
        let url = `items?id=${id}&tags=${tagString}&page=1`
        let res = await api.get(url)
        let items = res.items
        let total = res.total
        let pages = res.pages
        if (res == '404'){
            this.error(404, 'User not Found')
        }
        if (res == '423'){
            this.error(423, 'User not visible')
        }
        return {items, total, pages, user, id}
    }
</script>

<script>
    export let items = []
    export let total = 0
    export let pages = 0
    export let user
    export let id
    import {
        PaginationNav,
        TextInput,
        Checkbox,
        Column,
        Link,
        Tag,
        Row,
    } from 'carbon-components-svelte'
    import * as api from 'api'

    let page = 0

    let visible = true
    let open = false
    let current
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
        let tagString = JSON.stringify(tags)
        let url = `items?visible=${visible}&id=${id}&tags=${tagString}&page=${page+1}`
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
    <Column noGutter>
        <TextInput
            on:focus={() => (current=ref)}
            placeholder='Add tag'
            bind:value={tag}
            bind:ref
        />
    </Column>
</Row>

{#if user}
    <Row noGutter>
        <Column>
            <Checkbox bind:checked={visible} labelText='Visible' />
        </Column>
    </Row>
{/if}

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

{#each items as item}
    <Row noGutter>
        <div>
            {#if item.image}
                <img style='vertical-align: middle;' height='37px' width='37px' alt='profile pic' src={item.image}>
            {:else}
                <img style='vertical-align: middle;' height='37px' width='37px' alt='profile pic' src='/placeholder.png'>
            {/if}
            <Link href='item/{item.id}'>{item.name}</Link>
        </div>
    </Row>
    <br/>
{/each}

{#if got && total < 1}
<Row noGutter>
    <p>There don't seem to be any results for that</p>
</Row>
{/if}

{#if total>10}
    <PaginationNav loop bind:page bind:total={pages}/>
{/if}