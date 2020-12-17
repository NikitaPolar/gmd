let exampleScript = {};


exampleScript.OnUpdate = () => {
		console.log('wait');
		if(Engine.OnceAt(1)) {
			let players = EntitySystem.GetPlayersList();
			
			for(let player of players) {
				console.log(player.GetPlayerSelectedHeroName());
			}
		}
};
RegisterScript(exampleScript);