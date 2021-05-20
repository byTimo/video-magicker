import React, {FormEvent, useState} from "react";
import {Source} from "../../../../core/sources/Source";
import {ColorSource} from "../../../../core/sources/ColorSource";
import {Drawer} from "../../../../Controls/Drawer/Drawer";
import {VideoSource} from "../../../../core/sources/VideoSource";

export interface AddSourceProps {
    onAdd: (source: Source) => void;
}

export const AddSource: React.FC<AddSourceProps> = props => {
    const [lol, setLol] = useState(false)
    const ref = React.useRef<HTMLInputElement | null>(null);
    const handleClick = () => {
        // // const source = new ColorSource(Date(), 150, 70, 31);
        // // props.onAdd(source)
        // setLol(true);
        ref.current?.click();
    }

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if(event.currentTarget.files && event.currentTarget.files[0]) {
    //         const file = event.currentTarget.files[0];
    //         const reader = new FileReader();
    //         const image = new Image();
    //         reader.onloadend = () => {
    //             image.src = reader.result as string;
    //             props.onAdd(new ImageSource(file.name, file.name, image));
    //         };
    //
    //         reader.readAsDataURL(file);
    //     }
    // }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files && event.currentTarget.files[0]) {
            const file = event.currentTarget.files[0];
            const reader = new FileReader();
            const video = document.createElement("video");
            video.width = 600;
            video.height = 800;
            reader.onloadend = () => {
                video.src = reader.result as string;
                props.onAdd(new VideoSource(file.name, file.name, video));
            };

            reader.readAsDataURL(file);
        }
    }


    return (
        <>
            <button onClick={handleClick}>+</button>
            <input ref={ref} type="file" style={{display: "none"}} onChange={handleFileChange}/>
            {lol && (
                <Drawer
                    header={<>Color source <button onClick={() => setLol(false)}>x</button></>}
                >
                    <ColorForm onSubmit={props.onAdd}/>
                </Drawer>
            )}
        </>
    )
}

interface ColorFormProps {
    onSubmit: (source: ColorSource) => void;
}

const ColorForm: React.FC<ColorFormProps> = props => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target: any = event.currentTarget;
        props.onSubmit(new ColorSource(
            target.name.value,
            parseInt(target.red.value),
            parseInt(target.green.value),
            parseInt(target.blue.value),
        ))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" required/>
            <input name="red" required type="number"/>
            <input name="green" required type="number"/>
            <input name="blue" required type="number"/>
            <button type="submit">Submit</button>
        </form>
    )
}