import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import { For, Accessor, createState } from "ags"
import AstalWorkspace from "gi://AstalWorkspace"
import AstalBattery from "gi://AstalBattery"
import { Clock } from "./Clock"
import { Workspaces } from "./Worspaces"
import { Tray } from "./Tray"


export default function Bar(gdkmonitor: Gdk.Monitor) {
    const time = createPoll("", 1000, "date")
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    const ws = AstalWorkspace.get_default()
    const [workspaces, setWorkspaces] = createState(ws.get_workspaces())

    const [battery, setBattery] = createState(AstalBattery.get_default())


    return (
        <window
            visible
            name="bar"
            class="Bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
        >



            <box $type="start">
                <Workspaces />
            </box>

        </window>
    )
}
