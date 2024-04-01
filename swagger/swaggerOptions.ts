import { Router } from "express";
import dotenv from "dotenv";
import { setup, serve } from "swagger-ui-express";

// Invoke dotenv.config as a function
dotenv.config();

const docRouter = Router();

const options = {
    openapi: '3.0.1',
    info: {
        title: 'My Brand API Documentation',
        version: '1.0.0',
        description: 'Here is my brand API documentation using Swagger'
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`
        }
    ],
    basePath: 'brand',
    security: [
        {
            bearToken: []
        }
    ],
    tags: ['user', 'blog', 'message'],
    paths: {
        '/signup': {
            post: {
                summary: "Sign up user",
                tags: ["user"],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/User' }
                        }
                    }
                }
            }
        }
    },
    components: {
        securitySchemes: {
            bearToken: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string',
                        required: true
                    },
                    lastName: {
                        type: 'string'
                    },
                    email: {
                        type: 'string',
                        unique: true,
                        lowercase: true,
                    trim: true,
                    required: true
                },
                password: {
                    type: 'string',
                    minlength: 6,
                    required: true,
                },
                role: {
                    type: 'string',
                    required: true,
                    enum: ['user', 'admin'],
                    default: 'user'
                }
            }
        }
    }
}
};

docRouter.use('/', serve);
docRouter.get('/swagger', setup(options));

export default docRouter;
