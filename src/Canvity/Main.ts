import { App } from "./App";
import { Asset } from "./Asset/Asset";

export function StartApp(
    app: App, opts: any = { renderTarget: "2d", frameRate: 60, fpsLocked: true, updateRate: 60 }
): void {
    app.PreInit(opts);

    let drawDeltaTime = 1000 / opts.frameRate;
    let updateDeltaTime = 1000;
    if (!opts.fpsLocked) {
        updateDeltaTime = 1000 / opts.updateRate;
    }

    let postLoading: () => void = () => {
        app.Init(drawDeltaTime, updateDeltaTime);

        if (!opts.fpsLocked) {
            app.UpdateInterval = setInterval(() => {
                try {
                    app.Update();
                } catch (e) {
                    console.warn("Caught error, terminating threads: " + JSON.stringify([app.UpdateInterval, app.DrawInterval]));
                    clearInterval(app.UpdateInterval);
                    clearInterval(app.DrawInterval);
                    throw e;
                }
            }, updateDeltaTime);
        }
        app.DrawInterval = setInterval(() => {
            try {
                if (opts.fpsLocked) app.Update();
                app.Draw();
            } catch (e) {
                console.warn("Caught error, terminating threads: " + JSON.stringify([app.UpdateInterval, app.DrawInterval]));
                clearInterval(app.UpdateInterval);
                clearInterval(app.DrawInterval);
                throw e;
            }
        }, drawDeltaTime);

        app.PostInit();
    };

    Asset.OnFinishLoading = postLoading;
}
