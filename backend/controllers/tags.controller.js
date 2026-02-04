import Tags from "../model/tags.model.js";

export const createTags = async (req, res) => {
    try {
        const { user_id, name, color } = req.body;

        // Validate required fields
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Tag name is required" });
        }

        // Check if tag with same name already exists for this user
        const existingTag = await Tags.findOne({
            where: {
                user_id: user_id,
                name: name.trim()
            }
        });

        if (existingTag) {
            return res.status(409).json({ 
                message: "A tag with this name already exists for this user" 
            });
        }

        // Create new tag with default color if not provided
        const tags = await Tags.create({ 
            user_id, 
            name: name.trim(), 
            color: color || "#6366f1" // Default indigo color
        });

        res.status(201).json({ 
            message: "Tag successfully created",
            data: tags
        });
    } catch (error) {
        console.error("Error creating tag:", error);
        res.status(500).json({ 
            message: "Failed to create tag",
            error: error.message 
        });
    }
};