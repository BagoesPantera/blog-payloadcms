import React, { useEffect } from 'react';
import { useField, useFormFields, TextInput } from 'payload/components/forms';
import { useDocumentInfo } from 'payload/dist/admin/components/utilities/DocumentInfo';

export const SlugField: React.FC<{ path: string }> = ({ path }) => {
    const { id } = useDocumentInfo();

    const titleField = useFormFields((fields) => fields?.title);
    console.log(titleField)
    const title = titleField?.value as string;

    const { value: slugValue, setValue: setSlugValue } = useField<string>({ path });

    useEffect(() => {
        if (!id && title) {
            const slug = title.replace(/\s+/g, '-').toLowerCase();
            setSlugValue(slug);
        }
        console.log(title)
    }, [id, title, setSlugValue]);

    return (
        <div>
            <TextInput
                path={path}
                name="slug"
                value={slugValue}
                label="Slug"
                readOnly
            />
        </div>
    );
};
