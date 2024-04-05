import { Router, response } from "express";
import dotenv from "dotenv";
import { setup, serve } from "swagger-ui-express";
import mongoose from "mongoose";

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
            
            url:'https://portfolio-back-end-1-pm2e.onrender.com/brand'
        }
    ],
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
        },
        '/Sendmessage': {
            post: {
                summary: "Send message",
                tags: ["message"],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Message' }
                        }
                    }
                }
            }
        },
        '/login': {
            post: {
                summary: "user login",
                tags: ["user"],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                email: { type: "string" },
                                password: { type: "string" }
                            }
                        }
                    }
                }
            }
        },
        '/reset-password': {
            post: {
                summary: "user reset password",
                tags: ["user"],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                token: { type: "string" },
                                password: { type: "string" }
                            }
                        }
                    }
                }
            }
        },
        '/forgot-password': {
            post: {
                summary: "user request password reset",
                tags: ["user"],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                email: { type: "string" }
                            }
                        }
                    }
                }
            }
        },
        '/addblog': {
            post: {
                summary: "user add blog ",
                tags: ["blog"],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Blog' }
                        }
                    }
                },
                response:{
                    200:{
                        description:'success'
                    }
                }
            }
        },
        '/comment/{id}': {
            post: {
                summary: "adding comment",
                tags: ["blog"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Comment' }
                        }
                    }
                }
            }
        },
        '/updateBlog/{id}': {
            patch: {
                summary: "admin updating blog",
                tags: ["blog"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { 
                                title: { type: "string" },
                                content: { type: "string" }
                            }
                        }
                    }
                }
            }
        },
        '/like/{id}': {
            patch: {
                summary: "liking blog",
                tags: ["blog"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: "Liked"
                    }
                }
            }
        },
        '/deleteblog/{id}': {
            delete: {
                summary: "user deleting blog",
                tags: ["blog"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: "Deleted successfully"
                    },
                    '400': {
                        description: "Unauthorized"
                    }
                }
            }
        },
        '/deletemessage/{id}': {
            delete: {
                summary: "user deleting message",
                tags: ["message"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: "Deleted successfully"
                    },
                    '400': {
                        description: "Unauthorized"
                    }
                }
            }
        },
        '/subscriber': {
            get: {
                summary: "user get subscriber",
                tags: ["user"],
                responses: {
                    '200': {
                        description: "Success"
                    },
                    '400': {
                        description: "Unauthorized"
                    }
                }
            }
        },
        '/blogs': {
            get: {
                summary: "view all blogs",
                tags: ["blog"],
                responses: {
                    '200': {
                        description: "Success"
                    }
                }
            }
        },
        '/message': {
            get: {
                summary: "view all message",
                tags: ["message"],
                responses: {
                    '200': {
                        description: "Success"
                    },
                    '400': {
                        description: "Unauthorized"
                    }
                }
            }
        },
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
            },
            Message: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    text: {
                        type: 'string'
                    },
                    time: {
                        type: 'string',
                        format: 'date-time'
                    }
                }
            },
            Blog: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        required: true
                    },
                    content: {
                        type: 'string',
                        required: true
                    },
                    time: {
                        type: 'string',
                        required: true
                    },
                    likes: {
                        type: 'integer',
                        required: true,
                        default: 0
                    }
                }
            },
            Comment: {
                type: 'object',
                properties: {
                    blogId: {
                        type: 'string',
                        format: 'uuid',
                        required: true
                    },
                    comment: {
                        type: 'string',
                        required: true
                    },
                    time: {
                        type: 'string',
                        format: 'date-time',
                        required: true
                    }
                }
            }
        }
    }
};

docRouter.use('/', serve);
docRouter.get('/swagger', setup(options));

export default docRouter;
