const teamButton = Array.from(document.getElementsByClassName('collapsibleBox box'))[2]
teamButton.getElementsByClassName('arrowTitle')[0].click()
let teamBoxes = []
let allPlayerHeaders = []
let teamOverviews = []
setTimeout(() => {
    teamBoxes = Array.from(teamButton.getElementsByClassName('collapsibleBox box'))
    teamBoxes.forEach(t => t.getElementsByClassName('arrowTitle')[0].click())

    setTimeout(() => {
        teamOverviews = Array.from(teamBoxes.map(t => t.getElementsByClassName('boxContent')[0].getElementsByClassName('collapsibleBox box')))
        allPlayerHeaders = teamOverviews.map(t => Array.from(t)).flat()
        allPlayerHeaders.forEach(player => player.getElementsByClassName('arrowTitle')[0].click())

        setTimeout(() => {
            teamBoxes.forEach(team => {
                console.log(team.getElementsByClassName('arrowTitle')[0].innerHTML.split(">")[1].split("<span")[0].trim())
                const teamPlayers = Array.from(team.getElementsByClassName('boxContent')[0].getElementsByClassName('collapsibleBox box'))
                teamPlayers.forEach(player => {
                    const playerName = player.getElementsByClassName('arrowTitle')[0].innerHTML.split(">")[1].split("<span")[0].trim()
                    const faction = player.getElementsByClassName('listsList)')[0].children[0].children[0].children[1].getElementsByTagName('b')[0].innerText
                    console.log(faction + ' (' + playerName + ')')
                })
                console.log()
            })

        }, 1000);
    }, 100);
}, 100);

