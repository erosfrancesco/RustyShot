import { BaseScene } from "../../core/Scene"
import { Game } from "../../core/Game"
import {
    MeshBuilder,
    FreeCamera,
    Vector3,
    HemisphericLight,
    PointLight,
    Color3,
    Color4,
} from "@babylonjs/core"
import { GameEvents } from "../../core/Events"
import { SceneSwitcher } from "../../ui/SceneSwitcher"
import { createSceneSwitcherToggle } from "../../utils/sceneSwitcherToggle"
import { BookNookRegistry, nookVariants } from "../../book-nook"

/** Main nook viewer scene - demonstrates multiple nook variations. */
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
            new Vector3(0, 5, -10),
            this.scene,
        )
        camera.setTarget(Vector3.Zero())
        const canvas = this.engine.getRenderingCanvas()
        if (canvas) {
            camera.attachControl(canvas, true)
        }
        camera.minZ = 0.1

        new HemisphericLight("ambientLight", new Vector3(0, 1, 0), this.scene)

        const pointLight = new PointLight(
            "warmPointLight",
            new Vector3(0, 2.2, 0),
            this.scene,
        )
        pointLight.diffuse = new Color3(1, 0.9, 0.7)
        pointLight.intensity = 0.6

        MeshBuilder.CreateBox(
            "roomBase",
            { width: 4, height: 2.4, depth: 1.2 },
            this.scene,
        )

        MeshBuilder.CreateGround("floor", { width: 3, height: 1 }, this.scene)

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

        const variants = Object.keys(nookVariants) as Array<keyof typeof nookVariants>
        const spacing = 2.5

        for (let i = 0; i < variants.length; i++) {
            const variant = variants[i]
            const x = (i - (variants.length - 1) / 2) * spacing
            await this.nookRegistry.create(variant, new Vector3(x, 0, 0), variant)
        }
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