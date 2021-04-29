import { dbzShader, SHADER_TYPE } from './dbzShader.js';
import { dbzProgram } from './dbzProgram.js'
import { dbzAttributeLayout, dbzMesh } from './dbzMesh.js'

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('mainCanvas');
var gl = canvas.getContext('webgl2');

var vertexData =
[
    -0.5, 0.5, 1.0, 0.0, 0.0, 1.0,
    -0.5, -0.5, 0.0, 1.0, 0.0, 1.0,
    0.5, -0.5, 0.0, 0.0, 1.0, 1.0,
    0.5, 0.5, 1.0, 1.0, 1.0, 1.0
];
var indexData =
[
    0, 1, 2,
    0, 2, 3
];
var attributeLayout = [ new dbzAttributeLayout(0, 2, 24, 0), new dbzAttributeLayout(1, 4, 24, 8) ];
var mesh = new dbzMesh(gl, vertexData, attributeLayout, indexData);
mesh.Bind();

var vsData =
'#version 300 es\n' +
'layout(location = 0) in vec2 v_position;' +
'layout(location = 1) in vec4 v_color;' +
'out vec4 f_color;' +
'void main()' +
'{' +
    'gl_Position = vec4(v_position, 0.0f, 1.0f);' +
    'f_color = v_color;' +
'}'
var vertexShader = new dbzShader(gl, vsData, SHADER_TYPE.vertex);

var fsData =
'#version 300 es\n' +
'precision highp float;' +
'in vec4 f_color;' +
'layout(location = 0) out vec4 o_color;' +
'void main()' +
'{' +
    'o_color = f_color;' +
'}'
var fragmentShader = new dbzShader(gl, fsData, SHADER_TYPE.fragment);

var program = new dbzProgram(gl, [vertexShader, fragmentShader]);
program.Use();

function update(dt)
{
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
    window.requestAnimationFrame(update);
}

// Update every frame
window.requestAnimationFrame(update);