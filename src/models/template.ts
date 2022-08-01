import { Schema, model } from 'mongoose';

// Create the schema

const TemplateSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        pug: {
            type: String,
            required: true,
            unique: true,
        },
        css: {
            type: String,
            required: true,
            unique: true,
        },
        photo: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

// Create and export skill model

export default model('Template', TemplateSchema);
