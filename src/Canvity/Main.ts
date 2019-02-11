namespace Canvity {
    export function StartApp(app: App, opts: any = { renderTarget: '2d', frameRate: 60, fpsLocked: true, updateRate: 60 }): void {
        app.PreInit(opts);

        let drawDeltaTime = 1000 / opts.frameRate;
        let updateDeltaTime = 1000;
        if (!opts.fpsLocked) {
            updateDeltaTime = 1000 / opts.updateRate;
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

        CanvasManager.Start();

        app.PostInit();
    }
}