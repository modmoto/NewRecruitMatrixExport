const playerNames = [
    'Heiko',
    'Marc S.',
    'Marc B.',
    'Christian',
    'Simon',
    'Player 6',
    'Player 7',
    'Player 8'
]

const amountOfAdditionalColumnsBetweenPlayers = 0

const teamButton = Array.from(document.getElementsByClassName('collapsibleBox box'))[2]
teamButton.getElementsByClassName('arrowTitle')[0].click()
const isSingleTournament = teamButton.getElementsByClassName('arrowTitle')[0].innerHTML.includes("Players and Lists");
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

function extractPlayerDetails(player) {
    const playerHeaderItem = player.getElementsByClassName('arrowTitle')[0]
    const playerName = playerHeaderItem.innerText

    const listsListItem = player.getElementsByClassName('listsList)')[0];
    if (!listsListItem) return `-- / ${playerName},${",".repeat(amountOfAdditionalColumnsBetweenPlayers)}`
    const playerListItem = listsListItem.getElementsByTagName('fieldset')[0]
    const listItem = playerListItem.getElementsByTagName('div')[0]
    const factionItem = listItem.getElementsByTagName('b')[0]
    const faction = factionItem ? factionItem.innerText : listItem.innerHTML.split("<br>")[0]
    return `${factionMapping[faction]} / ${playerName},${",".repeat(amountOfAdditionalColumnsBetweenPlayers)}`
}

function createCsvDownload(csvContent) {
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "team_export.csv")
    document.body.appendChild(link)
    link.click()
}

setTimeout(() => {
    let csvContent = 'data:text/csv;charset=utf-8,'
    if (isSingleTournament) {
        const players = Array.from(teamButton.getElementsByClassName('collapsibleBox box'))
        players.forEach(player => player.getElementsByClassName('arrowTitle')[0].click())
        setTimeout(() => {
            players.forEach(player => {
                csvContent += extractPlayerDetails(player)
                csvContent += '\r\n'
            })

            createCsvDownload(csvContent)
        }, 1000)
    } else {
        teamBoxes = Array.from(teamButton.getElementsByClassName('collapsibleBox box'))
        teamBoxes.forEach(t => t.getElementsByClassName('arrowTitle')[0].click())

        setTimeout(() => {
            teamOverviews = Array.from(teamBoxes.map(t => t.getElementsByClassName('boxContent')[0].getElementsByClassName('collapsibleBox box')))
            allPlayerHeaders = teamOverviews.map(t => Array.from(t)).flat()
            allPlayerHeaders.forEach(player => player.getElementsByClassName('arrowTitle')[0].click())

            setTimeout(() => {
                teamBoxes.forEach(team => {
                    let htmlTeamName = team.getElementsByClassName('arrowTitle')[0].innerHTML;
                    const teamNameRaw = htmlTeamName.split(">")[1].split("<span")[0];
                    const teamName = teamNameRaw.trim().replace(/,/g, ' ');
                    csvContent += `${teamName},`
                    const teamPlayers = Array.from(team.getElementsByClassName('boxContent')[0].getElementsByClassName('collapsibleBox box'))
                    teamPlayers.forEach(player => {
                        csvContent += extractPlayerDetails(player)
                    })
                    csvContent += '\r\n'

                    const commasForEmptyLine = ",".repeat(teamPlayers.length * (1 + amountOfAdditionalColumnsBetweenPlayers))
                    for (let index = 0; index < teamPlayers.length; index++) {
                        csvContent += `${playerNames[index]}${commasForEmptyLine}\r\n`
                    }

                    csvContent += '\r\n'
                })

                createCsvDownload(csvContent)
            }, 1000)
        }, 100)
    }
}, 100)


