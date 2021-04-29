const SHADER_TYPE =
{
  vertex: "vert",
  fragment: "frag"
};

class dbzShader
{
  constructor(gl, data, type)
  {
    /** @type {WebGL2RenderingContext} */
    this._gl = gl;
    var shaderType;
    switch(type)
    {
      case SHADER_TYPE.vertex:
        shaderType = gl.VERTEX_SHADER;
        break;
      case SHADER_TYPE.fragment:
        shaderType = gl.FRAGMENT_SHADER;
        break;
    }

    var id = gl.createShader(shaderType);
    gl.shaderSource(id, data);
    gl.compileShader(id);
    var error_string = gl.getShaderInfoLog(id);
    if(error_string)
    {
      console.log(error_string);
    }
    this.Id = id;
  }
}

export { dbzShader, SHADER_TYPE };