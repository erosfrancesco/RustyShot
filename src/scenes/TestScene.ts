import { BaseScene } from "../core/Scene"
import { Game } from "../core/Game"
import {
    MeshBuilder,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    Color4,
    Scene,
} from "@babylonjs/core"
import { SceneSwitcher } from "../ui/SceneSwitcher"

/** Isolated test scene for debugging nook presets. */
export class TestScene extends BaseScene {
    private sceneSwitcher?: SceneSwitcher
    private switcherVisible = true

    constructor(game: Game) {
        super(game)
    }

    async setup(): Promise<void> {
        const camera = new ArcRotateCamera(
            "arcRotateCamera",
            Math.PI / 2,
            Math.PI / 3,
            3.5,
            new Vector3(0, 0.6, 0),
            this.scene,
        )
        camera.setTarget(Vector3.Zero())
        const canvas = this.engine.getRenderingCanvas()
        if (canvas) {
            camera.attachControl(canvas, true)
        }

        new HemisphericLight(
            "ambientLight",
            new Vector3(0, 1, 0),
            this.scene,
        ).intensity = 0.6

        MeshBuilder.CreateGround("ground", { width: 4, height: 4 }, this.scene)

        this.setupInput()

        this.state = "ready"
    }

    private setupInput(): void {
        const scene = this.scene as Scene
        scene.onKeyboardObservable.add(kbInfo => {
            if (kbInfo.type === 1 && kbInfo.event.key === "w") {
                this.switcherVisible = !this.switcherVisible
                this.sceneSwitcher?.setVisible(this.switcherVisible)
            }
        })
    }

    update(_deltaTime: number): void {
        if (this.state !== "active") return
        // Test per-frame logic
    }

    onEnter(): void {
        super.onEnter()
        this.scene.clearColor = new Color4(0.03, 0.03, 0.04, 1.0)
        this.sceneSwitcher = new SceneSwitcher(this.game, this.scene)
        this.sceneSwitcher.setVisible(this.switcherVisible)
    }

    onExit(): void {
        super.onExit()
        this.sceneSwitcher?.dispose()
        this.sceneSwitcher = undefined
    }
}
