<script context='module'>
    export async function preload({params}, {}){
        let items = []
        let total = 0
        let pages = 0
        let {id} = params
        let tagString = JSON.stringify([])
        let user = await api.get(`users/${id}`)
        let url = `items?id=${id}&tags=${tagString}&page=1`
        let res = await api.get(url)
        if (res == '404'){
            this.error(404, 'User not Found')
        }
        if (res == '423'){
            this.error(423, 'User not visible')
        }
        if(Array.isArray(res.items)){
            items = res.items
            total = res.total
            pages = res.pages
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
        Checkbox,
        Column,
        Row,
    } from 'carbon-components-svelte'
    import Tag from "../../components/Tag.svelte";
    import * as api from 'api'
    import { goto } from '@sapper/app'

    let page = 0

    let visible = true
    let tags=[]
    let got

    $: get(visible, page)

    const get = async function(){
        let tagString = JSON.stringify(tags)
        let url = `items?visible=${visible}&id=${id}&tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        if(Array.isArray(res.items)){
            items = res.items
            total = res.total
            pages = res.pages
            got = true
        }
    }
</script>

<svelte:head>
    <title>{`${user.username.split(' ')[0]}'s items`}</title>
</svelte:head>

<Tag on:change={get} placeholder='Search' bind:tags />

<Row noGutter>
    <Column>
        <Checkbox bind:checked={visible} labelText='Visible' />
    </Column>
</Row>

{#each items as item}
    <br/>
    <Row noGutter>
        <Column lg={1} sm={1} md={1} xlg={1}>
            <div on:click={goto(`item/${item.id}`)} class='pointer item'>
                {#if item.image}
                    <img style='vertical-align: top;' width='100%' alt='item display _image' src={item.image}>
                {:else}
                    <img style='vertical-align: top;' width='100%' alt='item display _image' src='/placeholder.png'>
                {/if}
                <div class='label'>
                    <h4>{item.name}</h4>
                    <!-- {#if item.itype}
                        <p class='bx--link--sm'>{item.itype}</p>
                    {/if} -->
                </div>
            </div>
        </Column>
    </Row>
{/each}

{#if got && total < 1}
    <Row noGutter>
        <p>There doesn't seem to be any results</p>
    </Row>
{/if}

{#if total>10}
    <PaginationNav loop bind:page bind:total={pages}/>
{/if}

<style>
    .label {
        padding-left: 0.5rem
    }
    .item {
        display: flex;
        flex-direction: row;
    }
    .pointer:hover {
        cursor: pointer;
    }
</style>