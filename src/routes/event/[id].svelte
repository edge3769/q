<script context='module'>
    import * as api from 'api'
    export async function preload({params}){
        let {id} = params
        let event = await api.get(`events/${id}`)
        if (event == '404')(
            this.error(404, 'event not Found')
        )
        if (event == '423')(
            this.error(423, 'event not visible')
        )
        return {event}
    }
</script>

<script>
    export let event
    import {
        Row,
        Link,
        Column,
    } from 'carbon-components-svelte'
    import {marked} from 'utils'
    import { stores } from '@sapper/app'
    
    let { session } = stores()

    let description
    if (event.description){
        description = marked(event.description)
    }
</script>

<Row noGutter>
    <Column lg={2} sm={2} md={2} xlg={2}>
        <div style='width: 111px; height: 111px;'>
            <img width=100% height=100% alt='eventImage' src={event.image}>
        </div>
    </Column>
    <Column lg={4} sm={4} md={4} xlg={4}>
        {#if event.name}
            <h2>{event.name}</h2>
        {/if}
        <p>{event.itype}</p>
        {#if event.address}
            <p>{event.address}</p>
        {/if}
        {#if event.website}
            <Link href={event.website}>{event.website}</Link>
        {/if}
        {#if event.email}
            <p>{event.email}</p>
        {/if}
        {#if event.phone}
            <p>{event.phone}</p>
        {/if}
        <!-- <Link href='' on:click={open}>Gallery</Link> -->
        <Link href='{event.user}'>User</Link>
        {#if $session.user.username == event.user}
            <Link href='edit/{event.id}'>Edit</Link>
        {/if}
    </Column>
</Row>

{#if description}
    <Row noGutter>
        <Column lg={6} sm={6} md={6} xlg={6}>
            <p>{@html description}</p>
        </Column>
    </Row>
{/if}