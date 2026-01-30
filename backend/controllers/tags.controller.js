import Tags from "../model/tags.model.js";

export const createTags = async (req, res) => {
    try {
        const { user_id, name, color} = req.body;

        if(!name) {
            return res.status(400).json({ message: "Name Required"});
        }

        const tags = await Tags.create({ user_id, name, color });

        res.status(201).json({ 
            message: "Successfully Created",
            data: tags
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
