<script>
    import { 
        stateId,
        nationId 
    } from '../stores.js'
    import { onMount } from 'svelte'
    import * as api from 'api'
    import Fuse from 'fuse.js'
    import {
        Row,
        Column,
        ComboBox
    } from 'carbon-components-svelte'

    $stateId = -1
    $nationId = -1

    onMount(() => {
        getNations()
    })

    const options = {
        ignorePosition: true,
        includeScore: true,
        keys: ['text']
    }

    let nation
    let nations = []
    let nationResults = []

    let getNations = async function(){
        nations = await api.get('nations')
    }

    let searchNations = function(){
        const fuse = new Fuse(nations, options)
        const r = fuse.search(nation)
        nationResults = []
        r.forEach((result) => {
            if (result.item){
                nationResults = [...nationResults, result.item]
            }
        })
        console.log(nationResults)
    }

    let state
    let states = []
    let stateResults = []

    let getStates = async function(){
        states = await api.get(`states?id=${$nationId+1}`)
    }

    let searchStates = async function(){
        let s = state
        const fuse = new Fuse(states, options)
        const r = fuse.search(s)
        r.forEach((result)=> {
            if (result.item){
                stateResults = [...stateResults, result.item]
            }
        })
    }

    $: getStates($nationId)
    $: if (nation) searchNations(nation)
    $: if (state) searchStates(state)
    $: if (state == '') { stateResults = states}
    $: if (nation == '') { nationResults = nations}
</script>

<Row>
    <Column noGutterRight>
        <ComboBox
            placeholder='Nation'
            bind:value={nation}
            bind:selectedIndex={$nationId}
            bind:items={nationResults}/>
    </Column>
    <Column noGutterLeft>
        <ComboBox
            placeholder='State'
            bind:value={state}
            bind:selectedIndex={$stateId}
            bind:items={stateResults}/>
    </Column>
</Row>