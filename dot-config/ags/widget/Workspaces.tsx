import GObject from "gnim/gobject";
import Hyprland from "gi://AstalHyprland"
import { Gtk } from "ags/gtk4";
import { For, Accessor, createBinding } from "ags";
import { execAsync } from "ags/process";

const hyprland = Hyprland.get_default()

function Workspace({ id }: { id: number }): GObject.Object {
    const handleFocus = () => {
        execAsync(`hyprctl dispatch workspace ${id}`)
    }

    const cssClass = createBinding(hyprland, "focused_workspace")
        .as((focused) => {
            const focusedId = focused.get_id()
            return focusedId === id ? "active-btn" : ""
        })

    return (
        <button
            label={`${id}`}
            onClicked={handleFocus}
            class={cssClass}
        >
        </button>
    )
}

// #amount workspaces shown by default, the rest are added and removed dynamically
export function Workspaces({ amount }: { amount: number }): GObject.Object {
    const workspaces = createBinding(hyprland, "workspaces")
        .as(
            // Merge the active workspaces with the defaults one.
            // Sort the array
            (current) => {
                // Safeguards to limit the default workspaces to 1..10
                let length = Math.max(Math.min(amount, 10), 1)
                const workspaces = new Set(
                    [...Array(length).keys()]
                        .map(key => key + 1)
                )
                // -- NOTE: weird bug when current.sort((a, b) => a.get_id() - b.get_id())
                current
                    .map(ws => ws.get_id())
                    .forEach(id => workspaces.add(id))

                return Array
                    .from(workspaces)
                    .sort((a, b) => a - b)
            }
        )


    return (
        <box orientation={Gtk.Orientation.HORIZONTAL}>
            <For each={workspaces}>
                {(id) => {
                    return (
                        <Workspace id={id} />
                    )
                }}
            </For>
        </box>
    )
}
