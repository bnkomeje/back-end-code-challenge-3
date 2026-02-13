import Joi  from "joi";

// Product operation schemas organized by request part
export const productSchemas = {
  // POST /products - Create new product
  create: {
    body: Joi.object({
      name: Joi.string().min(2).max(80).required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name must be at most 80 characters",
      }),
      sku: Joi.string()
        .pattern(/^[A-Z]{3}\d{4}$/)
        .required()
        .messages({
          "any.required": "SKU is required",
          "string.empty": "SKU cannot be empty",
          "string.pattern.base":
            'SKU must match pattern /^[A-Z]{3}\\d{4}$/ (e.g., ABC1234)',
        }),
      quantity: Joi.number().integer().min(0).required().messages({
        "any.required": "Quantity is required",
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be an integer",
        "number.min": "Quantity cannot be negative",
      }),
      price: Joi.number().positive().precision(2).required().messages({
        "any.required": "Price is required",
        "number.base": "Price must be a number",
        "number.positive": "Price must be greater than 0",
      }),
      category: Joi.string()
        .valid("electronics", "clothing", "food", "tools", "other")
        .required()
        .messages({
          "any.required": "Category is required",
          "any.only":
            "Category must be one of: electronics, clothing, food, tools, other",
        }),
    }),
  },

  // DELETE /products/:id - Delete product
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Product ID is required",
        "string.empty": "Product ID cannot be empty",
      }),
    }),
  },
};


