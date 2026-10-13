import { BaseScene } from "../../core/Scene"
import { Game } from "../../core/Game"
import {
    MeshBuilder,
    FreeCamera,
    Vector3,
    HemisphericLight,
    Color4,
} from "@babylonjs/core"
import { GameEvents } from "../../core/Events"
import { SceneSwitcher } from "../../ui/SceneSwitcher"
import { createSceneSwitcherToggle } from "../../utils/sceneSwitcherToggle"
import { BookNookRegistry } from "../../book-nook"

/** Main nook viewer scene - displays the simple oak nook. */
export class MainScene extends BaseScene {
    private nookRegistry?: BookNookRegistry
    private sceneSwitcher?: SceneSwitcher
    private sceneSwitcherToggle?: ReturnType<typeof createSceneSwitcherToggle>

    constructor(game: Game) {
        super(game)
    }

    async setup(): Promise<void> {
        const camera = new FreeCamera(
            "mainCamera",
            new Vector3(0, 3, -5),
            this.scene,
        )
        camera.setTarget(new Vector3(0, 0.8, 0))
        const canvas = this.engine.getRenderingCanvas()
        if (canvas) {
            camera.attachControl(canvas, true)
        }
        camera.minZ = 0.1

        new HemisphericLight("ambientLight", new Vector3(0, 1, 0), this.scene).intensity = 0.2

        MeshBuilder.CreateGround("floor", { width: 6, height: 4 }, this.scene)

        this.game.getEventBus().on(GameEvents.StateChange, () => {
            // React to game state changes if needed
        })

        this.nookRegistry = new BookNookRegistry(this.scene)
        await this.createNookDisplay()

        this.sceneSwitcherToggle = createSceneSwitcherToggle(this.scene, this.game)

        this.state = "ready"
    }

    private async createNookDisplay(): Promise<void> {
        if (!this.nookRegistry) return

        await this.nookRegistry.create('simple-oak', Vector3.Zero(), 'simple-oak')
    }

    update(_deltaTime: number): void {
        if (this.state !== "active") return
    }

    onEnter(): void {
        super.onEnter()
        this.scene.clearColor = new Color4(0.02, 0.02, 0.03, 1.0)
        this.sceneSwitcherToggle?.createSwitcher((s: SceneSwitcher) => { this.sceneSwitcher = s; })
    }

    onExit(): void {
        super.onExit()
        this.sceneSwitcherToggle?.disposeSwitcher(() => this.sceneSwitcher)
        this.sceneSwitcher = undefined
        this.nookRegistry?.dispose()
        this.nookRegistry = undefined
    }
}