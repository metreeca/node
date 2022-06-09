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


import { NodeSide } from "@metreeca/demo/views/side";
import * as React from "react";
import { createContext, createElement, ReactNode, useContext, useEffect, useState } from "react";
import { NodeIcon } from "../../../../../Projects/EC2U/Card/src/main/javascript/@node/tile/icon";
import { Optional } from "../../../../../Projects/EC2U/Data/src/main/javascript/@metreeca/core";
import { classes } from "../../../../../Projects/EC2U/Data/src/main/javascript/@metreeca/tool";
import "./page.css";


const Context=createContext<[Value, Updater]>([undefined, () => {}]);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The value component of the page context state.
 */
export type Value=Optional<boolean>;

/**
 * The updater component of the fetcher context state.
 */
export type Updater=(value: Value) => void;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function NodePage({

    children


}: {
    children?: ReactNode,

}) {

    const [expanded, setExpanded]=useState<boolean>();


    useEffect(() => {

        const resize=() => setExpanded(undefined);

        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);

    });


    return createElement(Context.Provider, {

        value: [expanded, setExpanded]

    }, createElement("node-page", {

        class: classes({
            expanded: expanded === true,
            collapsed: expanded === false
        }),

        onClick: (e: MouseEvent) => e.target === e.currentTarget && setExpanded(false)

    }, <>

        <aside>
            <NodeSide/>
        </aside>

        <main>
            <div>
                <header>
                    <button onClick={() => setExpanded(true)}><NodeIcon/></button>
                </header>
                <section>{children}</section>
            </div>

        </main>

    </>));

}

/**
 * Creates a page context hook.
 *
 * @return a state tuple including a current {@link Value| value} and an {@link Updater| updater} function.
 */
export function usePage(): [Value, Updater] {
    return useContext(Context);
}
