const assembleController = {
    // Function to add a new item
    addItem: async (req, res) => {
        try {
            const { itemName, itemNumber, stockAvailable, price, specification, images } = req.body;

            // Check if the itemNumber already exists
            const existingItem = await Assemble.findOne({ itemNumber });
            if (existingItem) {
                return res.status(400).json({ message: 'Item number already exists' });
            }

            // Create a new assemble item
            const newAssemble = new Assemble({
                itemName,
                itemNumber,
                stockAvailable,
                price,
                specification,
                images
            });

            // Save the item
            await newAssemble.save();
            res.status(201).json(newAssemble);
        } catch (error) {
            console.error('Error adding item:', error);
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Duplicate item number' });
            }
            res.status(500).json({ message: 'Server error' });
        }
    }
};
