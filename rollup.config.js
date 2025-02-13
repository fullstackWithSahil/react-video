import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
const PackageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: PackageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: PackageJson.module,
                format: 'esm',
                sourcemap: true
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss({
                extensions: ['.css'],
                minimize: true,
                inject: true
            }),
            terser()
        ],
        external: ["react", "react-dom"]
    },
    {
        input: 'src/index.ts',
        output: [{ file: PackageJson.types }],
        plugins: [dts()]
    }
];