import { createPoll } from "ags/time"
import GLib from "gi://GLib"
import GObject from "gi://GObject"
import Gtk from "gi://Gtk"
import { Accessor } from "gnim"

interface ClockOptions {
    format: string,
    tick: number
}

export function Clock(options: Partial<ClockOptions>): GObject.Object {
    const time = createPoll("", options?.tick ?? 1000, () => {
        return GLib.DateTime.new_now_local().format(options?.format ?? "%I:%M %p")!
    })

    return (
        <menubutton>
            <label label={time} />
            <popover>
                <Gtk.Calendar />
            </popover>
        </menubutton>
    )
}
