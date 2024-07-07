import {CollectionConfig, FieldHook} from 'payload/types'
import {AuthenticatedUser} from "../access/AuthenticatedUser.access";
import {AuthenticatedOrAdmin} from "../access/AuthenticatedOrAdmin.access";

const formatSlug: FieldHook = async ({ value, data }) => {
    return data?.title?.replace(/ /g, '-').toLowerCase() ?? value;
};

const Blogs: CollectionConfig = {
    slug: 'blogs',
    admin: {
        useAsTitle: 'id',
    },
    access: {
        create: AuthenticatedUser,
        read: AuthenticatedUser,
        update: AuthenticatedOrAdmin,
        delete: AuthenticatedOrAdmin,
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
            required: true
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
                beforeChange: [
                    formatSlug,
                ]
            },
            admin: {
                readOnly: true,
            }
        },
        {
            name: 'authorId',
            type: 'text',
        }
    ],
}

export default Blogs
