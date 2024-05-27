"use client"
export interface WindowDimensions {
    width: number;
    height: number;
}

const windowx = window

let windowDimensions: WindowDimensions = {
    width: windowx.innerWidth,
    height: windowx.innerHeight,
};

const handleResize = () => {
    windowDimensions = {
        width: windowx?.innerWidth,
        height: windowx?.innerHeight,
    };
    //AppActions.updateWindowDimensions(windowDimensions);
    windowx.location.reload();
};

//window.addEventListener('resize', handleResize);

const DESIGN_WIDTH = 1512;
const DESIGN_HEIGHT = 864;

const normGeneral = (size: number): number => {
    const minDimen =
        windowDimensions.width <= windowDimensions.height ? windowDimensions.width : windowDimensions.height;
    const widthActual = minDimen;
    const scale = widthActual / DESIGN_WIDTH;
    const newSize = size * scale;
    const finalSize = Math.round(newSize);
    return finalSize;
};

const normText = (size: number): number => {
    const minDimen =
        windowDimensions.width <= windowDimensions.height ? windowDimensions.width : windowDimensions.height;
    const widthActual = minDimen;
    const scale = widthActual / DESIGN_WIDTH;
    //const pixelRatio = window.devicePixelRatio || 1;
    const newSize = size * scale;
    //const finalSize = Math.round(newSize / pixelRatio);
    const finalSize = Math.round(newSize);
    return finalSize;
};

const getWindowDimensions = (): WindowDimensions => {
    return windowDimensions;
};

export {windowDimensions, DESIGN_WIDTH, DESIGN_HEIGHT, normGeneral, normText, getWindowDimensions};
