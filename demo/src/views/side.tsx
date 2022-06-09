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

import { usePage } from "@metreeca/demo/views/page";
import { Home, User, Users } from "@metreeca/skin/lucide";
import * as React from "react";
import { createElement } from "react";
import { NodeIcon } from "../../../../../Projects/EC2U/Card/src/main/javascript/@node/tile/icon";
import { classes, name } from "../../../../../Projects/EC2U/Data/src/main/javascript/@metreeca/tool";
import "./side.css";


export function NodeSide() {

    const sections=[
        { icon: <Home/>, label: "Uno", route: "/uno" },
        { icon: <Users/>, label: "Due", route: "/due" },
        { icon: <Users/>, label: "Tre", route: "/tre" }
    ];

    const [expanded, setExpanded]=usePage();

    return createElement("node-side", {

        class: classes({ collapsed: expanded === false }),

        style: { "--node-side-count": sections.length }

    }, <>

        <header>
            <button onClick={() => setExpanded(expanded === false)}><NodeIcon/><strong>{name}</strong></button>
        </header>

        <section>{sections.map(({ icon, label, route }) =>
            <a key={route} href={route}>{icon}<span>{label}</span></a>
        )}
        </section>

        <footer>
            <a href={"/uno"}><User/><span>Tino Faussone</span></a>
        </footer>

    </>);

}

