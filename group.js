function makeGroup() {
    const members = document.getElementById('members').value.split('\n').filter(Boolean)
    const leaders = document.getElementById('leaders').value.split('\n').filter(Boolean)
    const teamCount = document.getElementById('team_count').value

    let teams = []
    if (leaders.length !== 0) {
        teams = makeGroupWithLeaders(leaders, members)
    } else {
        teams = makeGroupWithoutLeaders(members, teamCount)
    }

    renderTeams(teams)
}

function makeGroupWithLeaders(leaders, members) {
    let leadersWithCount = []
    let leadersWithoutCount = []

    leaders.forEach((leader) => {
        if (/:/.test(leader)) {
            leaderArray = leader.split(':').filter(Boolean)
            leaderHash = { leader: leaderArray[0], count: leaderArray[1] }
            leadersWithCount.push(leaderHash)
        } else {
            leadersWithoutCount.push(leader)
        }
    });

    let membersShuffled = shuffleArray(members)
    let teams = []

    // with counts
    leadersWithCount.forEach(element => {
        let team = [element.leader]
        let count = element.count - 1
        let times = count;
        for (let i = 0; i < count; i++) {
            team.push(membersShuffled.shift())
        }
        teams.push(team)
    })

    // without counts
    let memberCount = Math.ceil(membersShuffled.length / leadersWithoutCount.length)
    leadersWithoutCount.forEach(leader => {
        let teamWithoutLeader = []

        for (let i = 0; i < memberCount; i++) {
            teamWithoutLeader.push(membersShuffled.shift())
        }

        teamWithoutLeader.unshift(leader)
        teams.push(teamWithoutLeader.filter(Boolean))
    })

    return teams
}

function makeGroupWithoutLeaders(members, teamCount) {
    let membersShuffled = shuffleArray(members)
    let memberCount = Math.ceil(membersShuffled.length / teamCount)

    let teams = []
    for (let i = 0; i < teamCount; i++) {
        let team = []
        for (let i = 0; i < memberCount; i++) {
            team.push(membersShuffled.shift())
        }
        teams.push(team.filter(Boolean))
    }

    return teams
}

function renderTeams(teams) {
    let groups = document.getElementById("groups")
    while (groups.firstChild) groups.removeChild(groups.firstChild);

    teams.forEach((team, index) => {
        if ((index % 5) == 0) {
            let tr = document.createElement("tr");
            groups.append(tr)
        }

        let tr = groups.lastChild
        let td = document.createElement("td");
        let teamStr = team.join("<br />")
        td.innerHTML = teamStr
        tr.appendChild(td)
        groups.append(tr)
    })
}

function shuffleArray(array) {
    let cloned = Array.from(array)
    let counter = cloned.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = cloned[counter];
        cloned[counter] = cloned[index];
        cloned[index] = temp;
    }
    return cloned;
}

window.onload = () => {
    document.getElementById("make_group").onclick = makeGroup;
}
