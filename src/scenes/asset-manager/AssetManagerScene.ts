import { BaseScene } from "../../core/Scene"
import { Game } from "../../core/Game"
import {
    MeshBuilder,
    FreeCamera,
    Vector3,
    HemisphericLight,
    DirectionalLight,
    Color4,
    TransformNode,
} from "@babylonjs/core"
import { SceneSwitcher } from "../../ui/SceneSwitcher"
import { createSceneSwitcherToggle } from "../../utils/sceneSwitcherToggle"
import { BookNookRegistry, nookVariants } from "../../book-nook"

/** Asset manager editor scene for creating and previewing nook presets. */
export class AssetManagerScene extends BaseScene {
    private sceneSwitcher?: SceneSwitcher
    private sceneSwitcherToggle?: ReturnType<typeof createSceneSwitcherToggle>
    private nookRegistry?: BookNookRegistry
    private previewRoot?: TransformNode
    private currentVariantIndex = 0
    private variantKeys = Object.keys(nookVariants) as Array<keyof typeof nookVariants>

    constructor(game: Game) {
        super(game)
    }

    async setup(): Promise<void> {
        const camera = new FreeCamera(
            "editorCamera",
            new Vector3(0, 8, -12),
            this.scene,
        )
        camera.setTarget(Vector3.Zero())
        const canvas = this.engine.getRenderingCanvas()
        if (canvas) {
            camera.attachControl(canvas, true)
        }
        camera.minZ = 0.1

        new HemisphericLight(
            "ambientLight",
            new Vector3(0, 1, 0),
            this.scene,
        ).intensity = 0.6

        new DirectionalLight(
            "directionalLight",
            new Vector3(-1, -2, -1),
            this.scene,
        ).intensity = 0.8

        MeshBuilder.CreateGround(
            "ground",
            { width: 30, height: 30, subdivisions: 2 },
            this.scene,
        )

        MeshBuilder.CreateCylinder(
            "previewPedestal",
            { height: 0.2, diameterTop: 1.2, diameterBottom: 1.4 },
            this.scene,
        )

        MeshBuilder.CreateLines(
            "gridHelper",
            { points: this.generateGridPoints(30, 1) },
            this.scene,
        )

        this.previewRoot = new TransformNode("previewRoot", this.scene)
        this.previewRoot.position.y = 0.3

        this.nookRegistry = new BookNookRegistry(this.scene)
        await this.loadCurrentVariant()

        this.setupVariantCycling()

        this.sceneSwitcherToggle = createSceneSwitcherToggle(this.scene, this.game)

        this.state = "ready"
    }

    private async loadCurrentVariant(): Promise<void> {
        if (!this.nookRegistry || !this.previewRoot) return

        this.nookRegistry.getAll().forEach(n => this.nookRegistry!.remove(n.config.id))

        const variantKey = this.variantKeys[this.currentVariantIndex]
        await this.nookRegistry.create(variantKey, Vector3.Zero(), "preview")
    }

    private setupVariantCycling(): void {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === 1 && kbInfo.event.key === "n") {
                this.currentVariantIndex = (this.currentVariantIndex + 1) % this.variantKeys.length
                this.loadCurrentVariant()
                console.log(`Switched to variant: ${this.variantKeys[this.currentVariantIndex]}`)
            }
        })
    }

    private generateGridPoints(size: number, step: number): Vector3[] {
        const points: Vector3[] = []
        for (let x = -size; x <= size; x += step) {
            points.push(new Vector3(x, 0, -size), new Vector3(x, 0, size))
        }
        for (let z = -size; z <= size; z += step) {
            points.push(new Vector3(-size, 0, z), new Vector3(size, 0, z))
        }
        return points
    }

    update(_deltaTime: number): void {
        if (this.state !== "active") return
    }

    onEnter(): void {
        super.onEnter()
        this.scene.clearColor = new Color4(0.1, 0.1, 0.1, 1.0)
        this.sceneSwitcherToggle?.createSwitcher((s) => { this.sceneSwitcher = s; })
    }

    onExit(): void {
        super.onExit()
        this.sceneSwitcherToggle?.disposeSwitcher(() => this.sceneSwitcher)
        this.sceneSwitcher = undefined
        this.nookRegistry?.dispose()
        this.nookRegistry = undefined
        this.previewRoot?.dispose()
        this.previewRoot = undefined
    }
}