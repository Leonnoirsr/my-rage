mp.events.add(`playerJoin`, (player) => {
    player.outputChatBox(`Coding environment. Welcome, ${player.name}!`);
});
mp.events.add('playerDeath', (player, reason, killer) => {
    setTimeout(() => {
        player.spawn(new mp.Vector3(-425.517, 1123.62, 325.8544));
    }, 3000);
});

mp.events.add('playerEnterColshape', async(player, radarCol) => {
    try {
        if (player.vehicle) {
            let vModel = await player.callProc('GetVehicleNameByModel');
            let vSpeed = await player.callProc('GetVehicleSpeed');
            vehList.push(`A ${vModel} passed the radar, going ${vSpeed} MPH`);
        }
    } catch (e) {
        console.error('Error: ' + e);
    }
});
mp.events.add('PlayerQuit')