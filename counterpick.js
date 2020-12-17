let exampleScript2 = {};


exampleScript2.OnUpdate = () => {
    if(Engine.OnceAt(1)) {
        console.log('hi');
    }
RegisterScript(exampleScript2);