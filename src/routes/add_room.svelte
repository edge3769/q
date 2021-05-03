<script context="module">
    export async function preload({ path }, { user }) {
        if (!user) {
            this.redirect(302, `enter`);
        }
        return { user }
    }
</script>

<script>
    export let user
    import Input from '../components/Input/Input.svelte'
    import Tag from '../components/Tag.svelte'
    import {
        Row,
        Button,
        Column,
        Checkbox,
        ButtonSet,
        FluidForm,
        InlineLoading
    } from 'carbon-components-svelte'
    import Exit16 from 'carbon-icons-svelte/lib/Exit16'
    import {open, username, context} from '../stores.js'
    import { goto } from '@sapper/app'
    import * as api from 'api'

    let nameInvalid
    let userInvalid
    let nameError
    let userError
    let openLabel
    let adding

    $: if(!$open){
        openLabel = 'Personal'
    } else {
        openLabel = 'Open'
    }

    $: change($username)

    $: if(process.browser && $username) {
        setTimeout(checkUser, 123)
    }

    let change=()=>{
        if($username){
            name = `${user.username}.${$username}`
        }
    }

    const checkUser=async()=>{
        if($username == '') return
        let res = await api.get(`users/${$username}`) || {}
        if(res.id){
            userInvalid = false
        } else {
            userInvalid = true
            userError = 'Not found'
        }
    }
    
    let name
    let tags

    const add = async function() {
        adding = true
        if (!name){
            nameInvalid = true
            nameError = 'Empty'
            adding = false
            return
        }
        if (!$username){
            userInvalid = true
            userError = 'Empty'
            adding = false
            return
        }
        let data = {
            username: $username,
            // open: $open,
            name,
            tags,
        }
        let res = await api.post('rooms', data, user.token)
        if (res.nameError) {
            nameError = res.nameError
            nameInvalid = true
            adding = false
        } else if (res.userError) {
            userError = res.userError
            userInvalid = true
            adding = false
        } else if (res.id) {
            $context=name
            adding=false
            goto(`room/${res.id}`)
        }
    }
</script>

<svelte:head>
    <title>Add Room</title>
</svelte:head>

<!-- <Row noGutter>
    <Column>
        <Checkbox bind:checked={$open} labelText={openLabel} />
    </Column>
</Row> -->

{#if $open}
    <Tag bind:tags />
{/if}

<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalid={nameInvalid}
                invalidText={nameError}
                labelText="Name"
                bind:value={name} 
            />
            {#if !$open}
                <Input
                    bind:invalid={userInvalid}
                    invalidText={userError}
                    labelText='User'
                    bind:value={$username}
                />
            {/if}
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <Column>     
        <ButtonSet stacked>
            <Button as let:props>
                <div on:click={add} {...props}>
                    <p>Add</p>
                    {#if adding}
                        <InlineLoading />
                    {/if}
                </div>
            </Button>
        </ButtonSet>
    </Column>
</Row>