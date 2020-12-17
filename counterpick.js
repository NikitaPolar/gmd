let exampleScript2 = {};


exampleScript2.OnUpdate = () => {
	setInterval(() => {
        let players = EntitySystem.GetPlayersList();
			
			for(let player of players) {
				console.log(player.GetPlayerSelectedHeroName());
			}
    }, 1500);
RegisterScript(exampleScript2);