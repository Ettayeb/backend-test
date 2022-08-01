import { Schema, model } from 'mongoose';

// Create the schema

const ProfileSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        headline: {
            type: String,
            required: true,
        },
        birthDate: {
            type: String,
            required: true,
        },

        fullName: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },
        proEmail: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
        experiences: [
            {
                title: { type: String, required: true },
                company: { type: String, required: true },
                startDate: { type: String, required: true },
                endDate: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        education: [
            {
                diploma: { type: String, required: true },
                university: { type: String, required: true },
                startDate: { type: String, required: true },
                endDate: { type: String, required: true },
            },
        ],
        certifications: [
            {
                title: { type: String, required: true },
                date: { type: String, required: true },
            },
        ],
        interests: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
);

// Create and export profile model

export default model('Profile', ProfileSchema);
