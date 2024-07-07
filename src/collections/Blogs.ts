import { CollectionConfig, FieldHook } from 'payload/types';
import { AuthenticatedUser } from '../access/AuthenticatedUser.access';
import { AuthenticatedOrAdmin } from '../access/AuthenticatedOrAdmin.access';
import { SlugField } from '../fields/slug.field';

const formatSlug: FieldHook = async ({ operation, value, data }) => {
    if (data?.title) if (operation === "create") return data?.title?.replace(/ /g, '-').toLowerCase() ?? value;
    return value
};

const Blogs: CollectionConfig = {
    slug: 'blogs',
    admin: {
        useAsTitle: 'id',
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            hooks: {
                beforeChange: [formatSlug],
            },
            admin: {
                readOnly: true,
                components: {
                    Field: SlugField,
                },
            },
        },
        {
            name: 'authorId',
            type: 'text',
        },
    ],
};

export default Blogs;
