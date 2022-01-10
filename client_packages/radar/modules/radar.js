mp.gui.chat.push('Coming from radar JS file')

const localplayer = mp.players.local;

// mp.events.add('GetVehicleData', () => {
//     let vehicle = localplayer.vehicle;
//     if (vehicle) {
//         let model = mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model)
//         let speed = Math.round(vehicle.getSpeed() * 2.236936);
//         mp.events.callRemote('addVehicleData', model, speed);
//         mp.gui.chat.push('Some shit happened on the client side');
//     }

// });

mp.events.addProc('GetVehicleData', () => {
    let vehicle = localplayer.vehicle
    const data = {
        model: mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model),
        speed: Math.round(vehicle.getSpeed() * 2.236936),
    };
    return JSON.stringify(data);
});