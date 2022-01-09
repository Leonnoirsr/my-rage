mp.events.add(`playerJoin`, (player) => {
    player.outputChatBox(`Coding environment. Welcome, ${player.name}!`);
});
mp.events.add('playerDeath', (player, reason, killer) => {
    setTimeout(() => {
        player.spawn(new mp.Vector3(-425.517, 1123.62, 325.8544));
    }, 3000);
});

mp.events.add('addVehicleData', (player, model, speed) => {
    player.radar.vehList.push(`A ${model} passed the radar, going ${speed} MPH`);
})

mp.events.add('playerEnterColshape', (player, radarCol) => {
    try {
        if (player.vehicle) {
            player.call('GetVehicleData');
            console.log('that shit worked bro')
        }
    } catch (e) {
        console.error('Error: ' + e);
    }
});
mp.events.add('playerQuit', (player) => {

    player.radar.destroy();
    console.log(`${player.name} has left the server and took the radar with them`);
});