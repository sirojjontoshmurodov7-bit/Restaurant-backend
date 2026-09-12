const { z } = require("zod");

const menuItemValidation = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().min(0),
  image: z.string(),
  category: z.string(),
  isAvailable: z.boolean()
});

module.exports = menuItemValidation;