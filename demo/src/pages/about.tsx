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

import { immutable } from "@metreeca/../../../../../Projects/EC2U/Card/src/main/javascript/@/core";
import { CloseIcon } from "@metreeca/../../../xxxx/tile/views/icon";
import * as React from "react";
import { copy, icon } from "../../../../../Projects/EC2U/Card/src/main/javascript/@node/tile";
import { NodePage } from "../views/page";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const about=immutable({

    id: "/about",
    label: "About",

    icon,
    name,
    copy

});

export function DemoAbout() {

    return <NodePage

        menu={<button title={"Close"}><CloseIcon/></button>}

    >

    </NodePage>;

}