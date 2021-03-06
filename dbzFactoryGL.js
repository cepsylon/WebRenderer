import { dbzShader } from './dbzShader.js'
import { dbzProgram } from './dbzProgram.js'

async function LoadFile(filePath)
{
  const response = await fetch(filePath);
  const data = await response.text();
  return data;
}

class dbzFactoryGL
{
  constructor(gl)
  {
    /** @type {WebGL2RenderingContext} */
    this._gl = gl;
  }

  CreateShader(data, type)
  {
    var shader = new dbzShader(this._gl, data, type);
    return shader;
  }

  CreateShaderFromFile(filePath)
  {
    const data = LoadFile(filePath);
    return this.CreateShader(data);
  }

  DestroyShader(shader)
  {
    this._gl.deleteShader(shader.Id);
  }

  CreateProgram(shaders)
  {
    return new dbzProgram(this._gl, shaders);
  }

  DestroyProgram(program)
  {
    this._gl.deleteProgram(program.Id);
  }
}

export { dbzFactoryGL };