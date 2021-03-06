 // events

 mp.events.add('playerEnterColshape', async(player, shape) => {
     try {
         if (player.vehicle) {
             let radarExist = radars.findIndex(rName => rName.colShape === shape);
             if (radarExist >= 0) {
                 let data = await player.callProc('GetVehicleData');
                 let parsedData = JSON.parse(data);

                 radars[radarExist].vehList.push(`A ${parsedData.model} passed the ${radars[radarExist].id} radar going, ${parsedData.speed} MPH`);
             }

         }
     } catch (e) {
         console.error('Error: ' + e);
     }
 });

 // mp.events.add('playerQuit', (player) => {

 //     p.radar.destroy();
 //     console.log(`${player.name} has left the server and took the radar with them`);
 // });


 //


 let calcDistanceBetweenTwoVectors = (pos1, pos2) => {
     let newPos = new mp.Vector3(pos1.x - pos2.x, pos1.y - pos2.y, pos1.z - pos2.z);
     return Math.sqrt(newPos.x * newPos.x + newPos.y * newPos.y + newPos.z * newPos.z);
 };

 const radars = [];

 // functions

 function findRadar(args) {
     let radarExist = radars.findIndex(rName => rName.id === args);

     if (radarExist < 0) {
         return -1
     }

     return radarExist

 }

 function radarAnim(player) {
     player.playAnimation('missbigscore2aig_7@driver', 'boot_l_loop', 60, 0)
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



 mp.events.addCommand('radar', (player, args, name) => {
     // Gets player position to place object directly infront
     const distance = 1.45;
     const position = player.position;

     const newPos = new mp.Vector3(
         position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
         position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
         position.z - 0.94
     );

     //Checks to see if a similar radar exists

     let radarExist = findRadar(name);

     if (radarExist >= 0) {
         player.notify('A similar radar already exists')
         return
     }


     // Creates the radar object
     const newRadar = {
         id: name,
         object: mp.objects.new('prop_air_lights_05a', newPos),
         colShape: null,
         vehList: []
     }

     player.notify(`You've placed a radar and named it ~g~${name}`)

     radars.push(newRadar);

     //Animation
     radarAnim(player);


 });

 mp.events.addCommand('removeradar', (player, args, name) => {


     let radarExist = findRadar(name)

     if (radarExist < 0) {
         player.notify('No such ~r~radar ~w~exists')
         return
     }

     if (calcDistanceBetweenTwoVectors(radars[radarExist].object.position, player.position) <= 5) {
         radars[radarExist].object.destroy();
         radars[radarExist].id.destroy
         radars.slice(radarExist, 1);
     } else {
         player.notify('There is no radar in the area');
     }

     radarAnim(player);

 });

 mp.events.addCommand('radaron', (player, args, name) => {
     const distance = 1.45;
     const position = player.position;


     const newPos = new mp.Vector3(
         position.x + Math.sin(-player.heading * Math.PI / 180) * distance,
         position.y + Math.cos(-player.heading * Math.PI / 180) * distance,
         position.z - 0.94
     );

     let radarExist = findRadar(name);

     if (radarExist < 0) {
         player.notify('No such ~r~radar ~w~exists')
         return
     }

     player.notify(`You've turned on the ~g~${name} ~w~radar`)

     // Creates collision sphere to activate radar
     if (calcDistanceBetweenTwoVectors(radars[radarExist].object.position, player.position) <= 5) {
         radars[radarExist].colShape = mp.colshapes.newSphere(newPos.x, newPos.y, newPos.z, 5);
     } else {
         player.notify('There is no ~r~radar ~w~here to turn on');
     }
 });

 mp.events.addCommand('checkradar', (player, args, name) => {

     let radarExist = findRadar(name)

     if (radarExist < 0) {
         player.notify(`No radar by the name ~r~${name} ~w~exists here`)
         return
     }

     player.notify(`Checking the ${name} radar...`);
     // Outputs the list of vehicles that passed the radar and the speed
     if (calcDistanceBetweenTwoVectors(radars[radarExist].object.position, player.position) <= 5) {
         radars[radarExist].vehList.forEach((veh) => {
             player.outputChatBox(`${veh}`);
         });
     } else {
         player.notify('there is no ~r~radar ~w~in the area to check');
     }

     radarAnim(player);
 });

 //  mp.events.addCommand('radars', (player, radars) => {


 //      player.notify(`There are currently ${radars.length()} radars active at the moment`)
 //  });