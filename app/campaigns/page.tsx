'use client';

import React, { useState } from "react";
import '../../styles/globals.css';

interface Milestone {
    description: string;
    amount: string;
}

const CampaignForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        milestones: [{ description: "", amount: "" }] as Milestone[],
        category: "",
        fundingGoal: "",
        duration: "",
        images: null as FileList | null,
    });

    const [errors, setErrors] = useState<any>({});
    const [isPreview, setIsPreview] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Type guard to check if the target is an HTMLInputElement
        if (type === 'file' && e.target instanceof HTMLInputElement) {
            const files = e.target.files;  // Now TypeScript knows e.target is an HTMLInputElement
            setFormData({ ...formData, [name]: files });
        } else {
            // For other input types (text, textarea, select), use the value
            setFormData({ ...formData, [name]: value });
        }
    };




    const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
        const updatedMilestones = [...formData.milestones];
        updatedMilestones[index][field] = value;
        setFormData({ ...formData, milestones: updatedMilestones });
    };

    const addMilestone = () => {
        setFormData({
            ...formData,
            milestones: [...formData.milestones, { description: "", amount: "" }],
        });
    };

    const removeMilestone = (index: number) => {
        const updatedMilestones = formData.milestones.filter((_, i) => i !== index);
        setFormData({ ...formData, milestones: updatedMilestones });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted:", formData);
            alert("Campaign submitted successfully!");
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors: any = {};
        if (!formData.title) errors.title = "Campaign title is required.";
        if (!formData.description) errors.description = "Description is required.";
        if (!formData.fundingGoal || isNaN(Number(formData.fundingGoal)) || Number(formData.fundingGoal) <= 0) {
            errors.fundingGoal = "Funding goal must be a positive number.";
        }
        if (!formData.duration) errors.duration = "Campaign duration is required.";
        return errors;
    };

    return (
        <div className="w-10/12 bg-red-300 m-auto mx-auto p-6 bg-white rounded shadow-md dark:bg-gray-800 ">
            <h2 className="text-2xl font-bold mb-6">Submit a New Campaign</h2>
            <form onSubmit={handleSubmit}>
                {/* Campaign Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Campaign Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Milestones */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Milestones</label>
                    {formData.milestones.map((milestone, index) => (
                        <div key={index} className="flex space-x-4 mb-2">
                            <input
                                type="text"
                                placeholder="Milestone Description"
                                className="flex-1 p-2 border rounded focus:outline-none"
                                value={milestone.description}
                                onChange={(e) =>
                                    handleMilestoneChange(index, "description", e.target.value)
                                }
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="w-28 p-2 border rounded focus:outline-none"
                                value={milestone.amount}
                                onChange={(e) =>
                                    handleMilestoneChange(index, "amount", e.target.value)
                                }
                            />
                            <button
                                type="button"
                                className="px-3 py-1 bg-red-500 text-white rounded"
                                onClick={() => removeMilestone(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={addMilestone}
                    >
                        Add Milestone
                    </button>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                        name="category"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a Category</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                        <option value="infrastructure">Infrastructure</option>
                    </select>
                </div>

                {/* Funding Goal */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Funding Goal</label>
                    <input
                        type="number"
                        name="fundingGoal"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.fundingGoal}
                        onChange={handleChange}
                    />
                    {errors.fundingGoal && <p className="text-red-500 text-sm">{errors.fundingGoal}</p>}
                </div>

                {/* Duration */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Campaign Duration (in days)</label>
                    <input
                        type="number"
                        name="duration"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                </div>

                {/* Images */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Upload Images/Proofs</label>
                    <input
                        type="file"
                        name="images"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        multiple
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded focus:outline-none"
                >
                    Submit Campaign
                </button>
            </form>

            {/* Campaign Preview */}
            {isPreview && (
                <div className="mt-6 p-4 border-t border-gray-300">
                    <h3 className="text-lg font-semibold">Campaign Preview</h3>
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Funding Goal:</strong> {formData.fundingGoal}</p>
                    <p><strong>Duration:</strong> {formData.duration} days</p>
                    <p><strong>Category:</strong> {formData.category}</p>
                    <h4 className="mt-4 font-semibold">Milestones</h4>
                    {formData.milestones.map((milestone, index) => (
                        <div key={index}>
                            <p>{milestone.description}: {milestone.amount}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CampaignForm;
