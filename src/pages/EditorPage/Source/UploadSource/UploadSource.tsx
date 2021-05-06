import React from "react";

export interface UploadSourceProps {
}

export const UploadSource: React.FC<UploadSourceProps> = props => {
    const ref = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        ref.current?.click();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) {
            console.log(files);
            // props.onAdd(Array.from(files));
            ref.current!.value = ""
        }
    }

    return (
        <div>
            <button onClick={handleClick}>+</button>
            <input
                style={{display: "none"}}
                ref={ref}
                type="file"
                onChange={handleChange}
            />
        </div>
    )
}