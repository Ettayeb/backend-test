import { Schema, model } from 'mongoose';

// Create the schema

const SkillSchema = new Schema(
    {
        title: {
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

export default model('Skill', SkillSchema);
