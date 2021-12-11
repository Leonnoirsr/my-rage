let calcDistanceBetweenTwoVectors = (pos1, pos2) => {
    let newPos = new mp.Vector3(pos1.x - pos2.x, pos1.y - pos2.y, pos1.z - pos2.z);
    return Math.sqrt(newPos.x * newPos.x + newPos.y * newPos.y + newPos.z * newPos.z);
};



// Stock commands

mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

// My commands

mp.events.addCommand('car', (player, vehName) => {
    mp.vehicles.new(mp.joaat(`${vehName}`), player.position, );
    model = vehName
});

mp.events.addCommand('radar', (player) => {
    // Gets player position to place object directly infront
    const distance = 1.45;
    const position = player.position;

    const newPos = new mp.Vector3(
        position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
        position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
        position.z - 0.94
    );

    // Creates the radar object
    player.radar = mp.objects.new('prop_air_lights_05a', newPos);
});

mp.events.addCommand('removeradar', (player) => {

    // Gets player position to place object directly infront
    const distance = 1.45;
    const position = player.position;

    const newPos = new mp.Vector3(
        position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
        position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
        position.z - 0.94
    );

    if (calcDistanceBetweenTwoVectors(player.radar.position, player.position) <= 5) {
        player.radar.destroy();
    } else {
        player.outputChatBox('There is no radar in the area');
    }
});

mp.events.addCommand('radaron', (player) => {
    const distance = 1.45;
    const position = player.position;

    const newPos = new mp.Vector3(
        position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
        position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
        position.z - 0.94
    );
    // Creates collision sphere to activate radar
    if (calcDistanceBetweenTwoVectors(player.radar.position, player.position) <= 5) {
        player.radar.radarCol = mp.colshapes.newSphere(newPos.x, newPos.y, newPos.z, 5);
    } else {
        player.outputChatBox('There is no radar here to turn on');
    }
    player.radar.vehList = [];
});

mp.events.addCommand('checkradar', (player) => {
    const distance = 1.45;
    const position = player.position;

    const newPos = new mp.Vector3(
        position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
        position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
        position.z - 0.94
    );
    player.outputChatBox('command works');
    // Creates collision sphere to activate radar
    if (player.radar) {
        if (calcDistanceBetweenTwoVectors(player.radar.position, player.position) <= 5) {
            player.radar.vehList.forEach((veh) => {
                player.outputChatBox(`${veh}`);
            });
        } else {
            player.outputChatBox('there is no radar in the area to check');
        }
    }
});


// mp.events.addCommand(`radar ${param}`, (player) => {
// 	// Gets player position to place object directly infront
// 	const distance = 1.45;
// 	const position = player.position;

// 	const newPos = new mp.Vector3(
// 		position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
// 		position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
// 		position.z - 0.94
// 	);

// 	switch(param)


// 	// Creates the radar object
// 	player.radar = mp.objects.new('prop_air_lights_05a', newPos);
// });

// mp.events.addCommand('removeradar', (player) => {
// 	player.radar;

// 	// Gets player position to place object directly infront
// 	const distance = 1.45;
// 	const position = player.position;

// 	const newPos = new mp.Vector3(
// 		position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
// 		position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
// 		position.z - 0.94
// 	);

// 	if (calcDistanceBetweenTwoVectors(player.radar.position, player.position) <= 5) {
// 		player.radar.destroy();
// 	} else {
// 		player.outputChatBox('There is no radar in the area');
// 	}
// });

// mp.events.addCommand('radaron', (player) => {
// 	const distance = 1.45;
// 	const position = player.position;

// 	const newPos = new mp.Vector3(
// 		position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
// 		position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
// 		position.z - 0.94
// 	);
// 	// Creates collision sphere to activate radar
// 	if (calcDistanceBetweenTwoVectors(player.radar.position, player.position) <= 5) {
// 		player.radar.radarCol = mp.colshapes.newSphere(newPos.x, newPos.y, newPos.z, 5);
// 	} else {
// 		player.outputChatBox('There is no radar here to turn on');
// 	}
// 	vehList = [];
// });

// mp.events.addCommand('checkradar', (player) => {
// 	const distance = 1.45;
// 	const position = player.position;

// 	const newPos = new mp.Vector3(
// 		position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
// 		position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
// 		position.z - 0.94
// 	);
// 	player.outputChatBox('command works');
// 	// Creates collision sphere to activate radar
// 	if (player.radar) {
// 		if (calcDistanceBetweenTwoVectors(player.radar.position, player.position) <= 5) {
// 			vehList.forEach((veh) => {
// 				player.outputChatBox(`${veh}`);
// 			});
// 		} else {
// 			player.outputChatBox('there is no radar in the area to check');
// 		}
// 	}
// });// });