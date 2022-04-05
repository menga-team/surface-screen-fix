const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Main = imports.ui.main;
const { Meta, St, Clutter } = imports.gi;


let overlay = null;

const resetStyle = () => {
    let {0: width, 1: height} = global.display.get_size();
    const border_size = 5;
    const side = (height > width) ? "right" : "top";
    if(side == "top") height -= border_size;
    else width -= border_size;
    overlay.set_style(
        `background-color: transparent;
        border-${side}: ${border_size}px solid white;
        width: ${width}px;
        height: ${height}px;`
    );
};
let resetStyleId = null;

function enable() {
    Meta.disable_unredirect_for_display(global.display);

    overlay = new St.Widget();
    resetStyle();
    Main.layoutManager.addChrome(overlay, {affectsInputRegion: false});
    resetStyleId = global.window_manager.connect('size-changed', resetStyle);
};

function disable() {
    Main.layoutManager.removeChrome(overlay);
    overlay.destroy();
    overlay = null;

    Meta.enable_unredirect_for_display(global.display);
};
