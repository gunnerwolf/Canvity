namespace Canvity {
    export function StartApp(app: App, opts: any = { frameRate: 60, fpsLocked: true, updateRate: 60 }): void {
        app.PreInit(opts);

        let drawDeltaTime = 1 / opts.frameRate;
        let updateDeltaTime = 1;
        if (!opts.fpsLocked) {
            let updateDeltaTime = 1 / opts.updateRate;
        }

        app.Init(drawDeltaTime, updateDeltaTime);

        if (!opts.fpsLocked) {
            app.UpdateInterval = setInterval(function() {
                app.Update();
            }, updateDeltaTime);
        }
        app.DrawInterval = setInterval(function() {
            if (opts.fpsLocked) app.Update();
            app.Draw();
        }, drawDeltaTime);

        app.PostInit();
    }
}