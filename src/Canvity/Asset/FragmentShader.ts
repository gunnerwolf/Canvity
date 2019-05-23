import { Shader } from "./Shader";

export class FragmentShader extends Shader {
    public createShader(gl: WebGLRenderingContext): WebGLShader {
        let shader = gl.createShader(gl.FRAGMENT_SHADER);
        if (shader == null) throw new Error("Invalid shader type!");
        gl.shaderSource(shader, this.shaderSource);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }

        throw new Error("Culd not compile shader!");
    }
}