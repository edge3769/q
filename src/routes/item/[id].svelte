<script context='module'>
    import * as api from 'api'
    export async function preload({params}){
        let {id} = params
        let item = await api.get(`items/${id}`)
        if (item == '404')(
            this.error(404, 'item not Found')
        )
        if (item == '423')(
            this.error(423, 'item not visible')
        )
        return {item}
    }
</script>

<script>
    export let item
    import {
        Row,
        Link,
        Column,
    } from 'carbon-components-svelte'
    import {parseMarkdown} from 'utils'
    import { stores } from '@sapper/app'
    
    let { session } = stores()

    let itext
    if(item.itext){
        itext = parseMarkdown(item.itext)
    }
</script>

<Row>
    {#if item.image}
        <Column lg={2} sm={2} md={2} xlg={2}>
                <img width=100% alt='item display _image' src={item.image}>
        </Column>
    {/if}
    <Column lg={4} sm={4} md={4} xlg={4}>
        {#if item.name}
            {#if item.redirect && item.link}
                <p style='font-weight: 600;'><a class='blank-link' href={item.link || ''}>{item.name}</a></p>
            {:else}
                <p style='font-weight: 600;'>{item.name}</p>
            {/if}
        {/if}
        <!-- {#if item.itype}
            <p>{item.itype}</p>
        {/if} -->
        <Link href='{item.user}'>User</Link>
        {#if $session.user && $session.user.username == item.user}
            <Link href='edit/{item.id}'>Edit</Link>
        {/if}
    </Column>
</Row>

<br />

{#if !item.redirect && itext}
    <Row>
        <Column lg={6} sm={6} md={6} xlg={6}>
            <div>{@html itext}</div>
        </Column>
    </Row>
{/if}

<style>
    .blank-link {
        text-decoration: none;
    }

    .blank-link:hover {
        cursor: pointer;
        color: rgb(50, 50, 211);
    }
</style>