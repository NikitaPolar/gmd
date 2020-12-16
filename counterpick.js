let exampleScript = {};

exampleScript.OnScriptLoad = () => {
    
    // Проверяем находится ли клиент в игре, так как в ином случае будет возвращен null.
    if(!GameRules.IsActiveGame()) {
        return;
    }
    
    // Получаем массив игроков
    let players = EntitySystem.GetPlayersList();
    
    for(let player of players) {
        // Выводим ник каждого игрока на карте
        console.log(player.GetName());
    }
};

RegisterScript(exampleScript);