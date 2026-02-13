import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";

interface RequestSchemas {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
}

export const validateRequest =
  (schemas: RequestSchemas) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const errors: string[] = [];

      const validatePart = (schema: ObjectSchema, data: unknown, label: string) => {
        const { error, value } = schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          errors.push(...error.details.map((d) => `${label}: ${d.message}`));
        }
        return value;
      };

      if (schemas.body) req.body = validatePart(schemas.body, req.body, "Body");
      if (schemas.params) req.params = validatePart(schemas.params, req.params, "Params");
      if (schemas.query) req.query = validatePart(schemas.query, req.query, "Query");

      if (errors.length > 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: `Validation error: ${errors.join(", ")}`,
        });
        return;
      }

      next();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown validation error";
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message });
    }
  };
