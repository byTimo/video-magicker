import React from 'react';
import classes from "./FileUpload.module.css";

export interface FileUploadProps {
    onAdd: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = props => {
    const ref = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        ref.current?.click();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) {
            props.onAdd(Array.from(files));
            ref.current!.value = ""
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Загрузить</button>
            <input
                className={classes.input}
                ref={ref}
                type="file"
                onChange={handleChange}
            />
        </div>
    )
}