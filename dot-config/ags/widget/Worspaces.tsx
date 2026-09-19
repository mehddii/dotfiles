import GObject from "gnim/gobject";
import Hyprland from "gi://AstalHyprland"
import { Gtk } from "ags/gtk4";
import { createComputed, For, Accessor, createState } from "ags";
import Workspace from "gi://AstalWorkspace";


export function Workspaces(): GObject.Object {
    const hyprland = Hyprland.get_default()

    const [workspaces, setWorkspaces] = createState(hyprland.get_workspaces())

    return (
        <box orientation={Gtk.Orientation.HORIZONTAL}>
            <For each={workspaces}>
                {(item, index: Accessor<number>) => {
                    return (
                        <button label={item.name}>
                        </button>
                    )
                }}
            </For>
        </box>
    )
}
