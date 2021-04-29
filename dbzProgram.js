import { dbzShader } from './dbzShader.js'

class dbzProgram
{
    constructor(gl, shaders)
    {
        /** @type {WebGL2RenderingContext} */
        this._gl = gl;
        var id = gl.createProgram();
        //var shader;
        for(var shader of shaders)
        {
            gl.attachShader(id, shader.Id);
        }

        gl.linkProgram(id);

        var error_string = gl.getProgramInfoLog(id);
        if(error_string)
        {
            console.log(error_string);
        }

        for(var shader of shaders)
        {
            gl.detachShader(id, shader.Id);
        }

        this.Id = id;
    }

    Use()
    {
        this._gl.useProgram(this.Id);
    }
}

export { dbzProgram };