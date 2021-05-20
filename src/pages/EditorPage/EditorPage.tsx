import React from "react";
import {Panel} from "../../components/Panel/Panel";
import {SourceList} from "./Source/SourceList";
import {Preview} from "./Preview/Preview";
import {Timeline} from "./Timeline/Timeline";
import {AddSource} from "./Source/UploadSource/AddSource";
import {Source} from "../../core/sources/Source";
import {Renderer} from "../../core/renderer/Renderer";
import {Fragment} from "../../core/renderer/Fragment";
import {ColorSource} from "../../core/sources/ColorSource";

export const EditorPage: React.FC = () => {
    const [sources, setSources] = React.useState<Source[]>([new ColorSource("red", 255, 0, 0)]);
    const renderer = React.useMemo(() => new Renderer(), []);

    const handleAddFragment = (source: Source) => {
        const fragment = new Fragment(source);
        renderer.addFragment(fragment);
    }

    return (
        <>
            <Panel
                style={{gridArea: "aside"}} header="Sources"
                footer={<AddSource onAdd={source => setSources(prev => [...prev, source])}/>}
            >
                <SourceList sources={sources} onClick={handleAddFragment}/>
            </Panel>
            <Panel style={{gridArea: "main"}} header="Preview">
                <Preview renderer={renderer}/>
            </Panel>
            <Panel style={{gridArea: "footer"}} header="Timeline">
                <Timeline renderer={renderer}/>
            </Panel>
        </>
    )
}