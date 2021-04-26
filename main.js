
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('mainCanvas');
var gl = canvas.getContext('webgl');

function update(dt)
{
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    window.requestAnimationFrame(update);
}

// Update every frame
window.requestAnimationFrame(update);