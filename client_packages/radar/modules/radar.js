// mp.gui.chat.push('Coming from radar JS file')

const localplayer = mp.players.local;

mp.events.addProc('GetVehicleNameByModel', () => {
	let vehicle = localplayer.vehicle;
	if (vehicle) return mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model);
	else return null;
});

mp.events.addProc('GetVehicleSpeed', () => {
	let vehicle = localplayer.vehicle;
	function getSpeed() {
		let speed = vehicle.getSpeed();
		speed = Math.round(speed* 2.236936); 
		return speed;
	}

	if (vehicle) return getSpeed();
	else return null;
});
