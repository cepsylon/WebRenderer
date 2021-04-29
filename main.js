import { dbzFactoryGL } from './dbzFactoryGL.js'
import { dbzShader, SHADER_TYPE } from './dbzShader.js';
import { dbzProgram } from './dbzProgram.js'

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('mainCanvas');
var gl = canvas.getContext('webgl2');

var glFactory = new dbzFactoryGL(gl);

//var error = gl.getError();
var vao = gl.createVertexArray();
gl.bindVertexArray(vao);

var vertexData =
[
    -0.5, 0.5, 1.0, 0.0, 0.0, 1.0,
    -0.5, -0.5, 0.0, 1.0, 0.0, 1.0,
    0.5, -0.5, 0.0, 0.0, 1.0, 1.0,
    0.5, 0.5, 1.0, 1.0, 1.0, 1.0
];
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, 0, 24, 0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1, 4, gl.FLOAT, 0, 24, 8);

var indexData =
[
    0, 1, 2,
    0, 2, 3
];
var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indexData), gl.STATIC_DRAW);

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
var vertexShader = glFactory.CreateShader(vsData, SHADER_TYPE.vertex);

var fsData =
'#version 300 es\n' +
'precision highp float;' +
'in vec4 f_color;' +
'layout(location = 0) out vec4 o_color;' +
'void main()' +
'{' +
    'o_color = f_color;' +
'}'
var fragmentShader = glFactory.CreateShader(fsData, SHADER_TYPE.fragment);

var program = glFactory.CreateProgram([vertexShader, fragmentShader]);
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