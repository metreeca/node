/*
 * Copyright © 2020-2022 Metreeca srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

const fs=require("fs");
const path=require("path");
const glob=require("glob");
const dedent=require("dedent");

const md="package.md";
const json="package.json";
const readme="README.md";
const license="LICENSE";

const code=path.resolve("code");
const dist=path.resolve("dist");

const global=JSON.parse(fs.readFileSync(path.resolve(json)));


// Create publishing root package

fs.writeFileSync(path.resolve(dist, json), JSON.stringify({

    ...publishing(global),

    workspaces: ["*"]

}, null, 4));


// create publishing packages

fs.readdirSync(code).filter(file => fs.existsSync(path.resolve(code, file, json))).forEach(module => {

    const source=path.resolve(code, module);
    const target=path.resolve(dist, module);

    const local=JSON.parse(fs.readFileSync(path.resolve(source, json)));


    // create README.md

    fs.writeFileSync(path.resolve(target, readme), dedent`
    
        [![npm](https://img.shields.io/npm/v/${local.name})](https://www.npmjs.com/package/${local.name})
    
        # ${local.name}
        
        [Metreeca/Node](https://github.com/metreeca/node) ${lower(local.description)}.
                        
        ${fs.readFileSync(path.resolve(source, md))}
        
        # Support
        
        - open an [issue](https://github.com/metreeca/node/issues) to report a problem or to suggest a new feature
        - start a [discussion](https://github.com/metreeca/node/discussions) to ask a how-to question or to share an idea
        
        # License
        
        This project is licensed under the Apache 2.0 License – see
        [LICENSE](https://github.com/metreeca/node/blob/main/LICENSE) file for details.
    
    `);


    // create package.json

    fs.writeFileSync(path.resolve(target, json), JSON.stringify(publishing(local), null, 4));


    // copy license

    fs.copyFileSync(license, path.resolve(target, license));


    // copy stylesheets

    glob.sync(`${source}/**/*.css`).forEach(css =>
        fs.copyFileSync(css, path.resolve(target, path.relative(source, css)))
    );

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function publishing(local) {
    return {

        name: local.name,
        version: global.version,
        description: `Metreeca/Node ${lower(local.description)}`,
        keywords: local.keywords,
        homepage: global.homepage,
        repository: global.repository,
        bugs: global.bugs,
        license: global.license,
        author: global.author,
        main: "index.js",
        types: "index.d.ts",
        dependencies: local.dependencies,
        peerDependencies: local.peerDependencies

    };
}

function lower(string) {
    return string.replace(/^\w(?![A-Z])/, c => c.toLowerCase());
}
