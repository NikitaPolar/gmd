let telegramNotify = {};
var TelegramNotify;
(function (TelegramNotify) {
    let CONFIG_NAME = "Polar_Telegram_Notify";
    let BASE_PATH = ['NUtils', "Telegram Notify"];
    TelegramNotify.isActiveScript = false;
    Menu.AddToggle(BASE_PATH, "On/Off", TelegramNotify.isActiveScript).OnChange((state => {
        TelegramNotify.isActiveScript = state.newValue;
    }));
    TelegramNotify.menuToken = Menu.AddInputBox(BASE_PATH, 'TOKEN                                      ', Config.ReadString(CONFIG_NAME, 'TOKEN', ''));
    TelegramNotify.myChatIdMenu = Menu.AddInputBox(BASE_PATH, 'Chat ID', Config.ReadString(CONFIG_NAME, 'CHAT_ID', ''));
    TelegramNotify.textForGameFound = Menu.AddInputBox(BASE_PATH, 'Text For Game Found', Config.ReadString(CONFIG_NAME, 'TEXT_FOR_GAME_FOUND', 'Game found'));
    let saveButton = Menu.AddButton(BASE_PATH, 'SAVE', () => {
        Config.WriteString(CONFIG_NAME, "TOKEN", TelegramNotify.menuToken.GetValue());
        Config.WriteString(CONFIG_NAME, "CHAT_ID", TelegramNotify.myChatIdMenu.GetValue());
        Config.WriteString(CONFIG_NAME, "TEXT_FOR_GAME_FOUND", TelegramNotify.textForGameFound.GetValue());
    });
    let getChatId = Menu.AddButton(BASE_PATH, 'GET CHAT ID', () => {
        let TOKEN = TelegramNotify.menuToken.GetValue();
        if (TOKEN) {
            let resp = HTTP.Request("api.telegram.org", `bot${TOKEN}/getUpdates`, "GET", { ssl: true });
            let json = JSON.parse(resp.GetBody());
            if (json['ok']) {
                let id = json['result'][0]['message']['from']['id'];
                TelegramNotify.myChatIdMenu.SetValue(id.toString());
                Config.WriteString(CONFIG_NAME, "CHAT_ID", TelegramNotify.myChatIdMenu.GetValue());
            }
        }
    });
    let sendTestMessageButton = Menu.AddButton(BASE_PATH, 'SEND TEST MESSAGE', () => {
        HTTP.Request("api.telegram.org", `bot${TelegramNotify.menuToken.GetValue()}/sendMessage?chat_id=${TelegramNotify.myChatIdMenu.GetValue()}&text=${TelegramNotify.textForGameFound.GetValue()}`, "GET", { ssl: true });
    });
})(TelegramNotify || (TelegramNotify = {}));
var gameAlreadyPlay = false;
telegramNotify.OnUpdate = () => {
    if (Engine.IsInGame() && !gameAlreadyPlay) {
        gameAlreadyPlay = true;
        HTTP.Request("api.telegram.org", `bot${TelegramNotify.menuToken.GetValue()}/sendMessage?chat_id=${TelegramNotify.myChatIdMenu.GetValue()}&text=${TelegramNotify.textForGameFound.GetValue()}`, "GET", { ssl: true });
    } else {
        gameAlreadyPlay = false;
        if (TelegramNotify.isActiveScript && Engine.CanAcceptMatch() && Engine.OnceAt(1)) {
            HTTP.Request("api.telegram.org", `bot${TelegramNotify.menuToken.GetValue()}/sendMessage?chat_id=${TelegramNotify.myChatIdMenu.GetValue()}&text=${TelegramNotify.textForGameFound.GetValue()}`, "GET", { ssl: true });
        }
    }
};
RegisterScript(telegramNotify);