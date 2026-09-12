const { z } = require("zod");

const categoryValidation = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(5).max(200).optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().optional()
});

module.exports = categoryValidation;