const teamButton = Array.from(document.getElementsByClassName('collapsibleBox box'))[2]
teamButton.getElementsByClassName('arrowTitle')[0].click()
let teamBoxes = []
let allPlayerHeaders = []
let teamOverviews = []
const factionMapping = {
    "Beast Herds": "BH",
    "Daemon Legions": "DL",
    "Dread Elves": "DE",
    "Dwarven Holds": "DH",
    "Empire of Sonnstahl": "EoS",
    "Highborn Elves": "HE",
    "Infernal Dwarves": "ID",
    "Kingdom of Equitaine": "KoE",
    "Ogre Khans": "OK",
    "Orcs and Goblins": "OnG",
    "Saurian Ancients": "SA",
    "Sylvan Elves": "SE",
    "Undying Dynasties": "UD",
    "Vampire Covenant": "VC",
    "Vermin Swarm": "VS",
    "Warriors of the Dark Gods": "WdG"
}
setTimeout(() => {
    teamBoxes = Array.from(teamButton.getElementsByClassName('collapsibleBox box'))
    teamBoxes.forEach(t => t.getElementsByClassName('arrowTitle')[0].click())

    setTimeout(() => {
        teamOverviews = Array.from(teamBoxes.map(t => t.getElementsByClassName('boxContent')[0].getElementsByClassName('collapsibleBox box')))
        allPlayerHeaders = teamOverviews.map(t => Array.from(t)).flat()
        allPlayerHeaders.forEach(player => player.getElementsByClassName('arrowTitle')[0].click())

        setTimeout(() => {
            let message = ''
            teamBoxes.forEach(team => {
                message += `<b>${team.getElementsByClassName('arrowTitle')[0].innerHTML.split(">")[1].split("<span")[0].trim()}</b>`
                message += '<br/>'
                const teamPlayers = Array.from(team.getElementsByClassName('boxContent')[0].getElementsByClassName('collapsibleBox box'))
                teamPlayers.forEach(player => {
                    const playerName = player.getElementsByClassName('arrowTitle')[0].innerHTML.split(">")[1].split("<span")[0].trim()
                    const faction = player.getElementsByClassName('listsList)')[0].children[0].children[0].children[1].children[0].innerText
                    message += `${factionMapping[faction]} / ${playerName}`
                    message += '<br/>'
                })
                message += '<br/>'
            })

            document.body.innerHTML = message

        }, 1000);
    }, 100);
}, 100);

