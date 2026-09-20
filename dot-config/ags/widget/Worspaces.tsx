import GObject from "gnim/gobject";
import Hyprland from "gi://AstalHyprland"
import { Gtk } from "ags/gtk4";
import { For, Accessor, createState } from "ags";
import { execAsync } from "ags/process";

function Workspace({ id }: { id: number }): GObject.Object {
    const handleFocus = () => {
        execAsync(`hyprctl dispatch workspace ${id}`)
    }

    return (
        <button label={`${id}`} onClicked={handleFocus}>
        </button>
    )
}

export function Workspaces(): GObject.Object {
    const hyprland = Hyprland.get_default()

    const findPosition = (workspaces: Array<Hyprland.Workspace>, id: number): number => {
        const result = workspaces.filter((ws) => ws.get_id() < id)
        return result.length
    }

    const [workspaces, setWorkspaces] = createState(hyprland.get_workspaces().sort((a, b) => a.get_id() - b.get_id()))
    hyprland.connect("workspace-added", (_, workspace: Hyprland.Workspace) => {
        const current = Array.from(workspaces.peek())
        const pos = findPosition(current, workspace.get_id())

        current.splice(pos, 0, workspace)
        setWorkspaces(current)
    })

    hyprland.connect("workspace-removed", (_, id: number) => {
        const current = Array.from(workspaces.peek())
        const pos = findPosition(current, id)

        current.splice(pos, 1)
        setWorkspaces(current)
    })

    return (
        <box orientation={Gtk.Orientation.HORIZONTAL}>
            <For each={workspaces}>
                {(item) => {
                    return (
                        <Workspace id={item.get_id()} />
                    )
                }}
            </For>
        </box>
    )
}
