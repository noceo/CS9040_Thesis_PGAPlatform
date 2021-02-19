import { Color, Shader } from 'three'

export const treeColorShader: Shader = {
  uniforms: {
    colorLow: { value: new Color(0, 1, 0) },
    colorHigh: { value: new Color(1, 0, 0) },
    gradientFactor: { value: 0.75 },
  },
  vertexShader: `
    #include <fog_pars_vertex>

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      #include <fog_vertex>
    }
  `,
  fragmentShader: `
    uniform float gradientFactor;
    uniform vec3 colorLow;
    uniform vec3 colorHigh;
    #include <fog_pars_fragment>

    void main() {
      gl_FragColor = vec4(mix(colorLow, colorHigh, gradientFactor), 1.0);
      #include <fog_fragment>
    }
  `,
}
