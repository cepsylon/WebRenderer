class dbzAttributeLayout
{
    constructor(bindPoint, count, strideInBytes, offsetInBytes)
    {
        this.binding = bindPoint;
        this.count = count;
        this.stride = strideInBytes;
        this.offset = offsetInBytes;
    }
}

class dbzMesh
{
    constructor(gl, vertices, attributeLayout, indices)
    {
        /** @type {WebGL2RenderingContext} */
        this._gl = gl;
        this.Id = gl.createVertexArray();
        this.Bind();

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertexId = vertexBuffer;

        for(var attribute of attributeLayout)
        {
            gl.enableVertexAttribArray(attribute.binding);
            gl.vertexAttribPointer(attribute.binding, attribute.count, gl.FLOAT, 0, attribute.stride, attribute.offset);
        }

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
    }

    Bind()
    {
        this._gl.bindVertexArray(this.Id);
    }
}

export { dbzAttributeLayout, dbzMesh };