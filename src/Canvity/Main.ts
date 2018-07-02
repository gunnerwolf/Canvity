namespace Canvity {
    export function StartApp(app: App, opts: any = { frameRate: 60, fpsLocked: true, updateRate: 0 }): void {
        let drawDeltaTime = 1 / opts.frameRate;
        if (!opts.fpsLocked) {
            let updateDeltaTime = 1 / opts.updateRate;
            app.UpdateInterval = setInterval(function() {
                app.Update();
            }, updateDeltaTime);
        }
        app.DrawInterval = setInterval(function() {
            if (opts.fpsLocked) app.Update();
            app.Draw();
        }, drawDeltaTime);
    }
}