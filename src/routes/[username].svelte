<script context='module'>
    import * as api from 'api'
    export async function preload({params}){
        let {username} = params
        let user = await api.get(`users/${username}`)
        if (user == '404')(
            this.error(404, 'User not Found')
        )
        if (!user.visible)(
            this.error(423, 'User not visible')
        )
        return {user}
    }
</script>

<script>
    export let user
    import {
        Column,
        Link,
        Row
    } from 'carbon-components-svelte'
    import User20 from 'carbon-icons-svelte/lib/User20'
    import Phone20 from 'carbon-icons-svelte/lib/Phone20'
    import Earth20 from 'carbon-icons-svelte/lib/Earth20'
    import Email20 from 'carbon-icons-svelte/lib/Email20'
    import Location20 from 'carbon-icons-svelte/lib/Location20'
    import { stores } from '@sapper/app'
    import {parseMarkdown} from 'utils'

    let { session } = stores()

    let about
    if (user.about) about = parseMarkdown(user.about)
</script>

<Row>
    {#if user.image}
        <Column lg={2} sm={2} md={2} xlg={2}>
            <img style='width: 100%;' alt='user display _image' src={user.image}>
        </Column>
    {/if}
    <Column lg={4} sm={4} md={4} xlg={4}>
        {#if user.name}
            <p style='font-weight: 600;'>{user.name}</p>
        {/if}
        {#if user.username}
            <div>
                <User20 />
                <span class='heading'>{user.username}</span>
            </div>
        {/if}
        {#if user.address}
            <div>
                <Location20 />
                <span class='heading'>{user.address}</span>
            </div>
        {/if}
        {#if user.show_email && user.email}
            <div>
                <Email20 />
                <span class='heading'>{user.email}</span>
            </div>
        {/if}
        {#if user.website}
            <div>
                <Earth20 />
                <a class='heading bx--link' href={user.website}>{user.website}</a>
            </div>
        {/if}
        {#if user.phone}
            <div>
                <Phone20 />
                <span class='heading'>{user.phone}</span>
            </div>
        {/if}
        <br />
        {#if !user.items_empty}
            <Link href='items/{user.id}'>Items</Link>
        {/if}
        {#if $session.user && $session.user.username == user.username}
            <Link href='edit'>Edit</Link>
        {/if}
    </Column>
</Row>

<br />

<Row>
    <Column lg={6} sm={6} md={6} xlg={6}>
        {#if about}
            <p>{@html about}</p>
        {/if}
    </Column>
</Row>

<style>
    
</style>