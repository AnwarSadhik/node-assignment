
export const swaggerDocs = {
    openapi: "3.0.0",
    info: {
        title: "Node.js Todo challenge",
        version: "1.0.0",
        description: "Node.js Todo challenge by immverse.ai"
    },
    servers: [
        {
            url: "http://localhost:5000/",
            description: "Local dev"
        },
    ],
    tags: [
        {
            name: "/",
            description: "to check the status of the server"
        },
        {
            name: "user",
            description: "Complete user management with JWT authentication"
        },
        {
            name: "todos",
            description: "Complete TODOs CRUD with pagination feature"
        },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            in: 'header',
            name: 'Authorization',
            description: 'Bearer token to access these api endpoints',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    paths: {
        "/": {
            get: {
                tags: ["root"],
                responses: {
                    200:{
                        description: "OK",
                    }
                }
            }
        },
        "/api/user/register": {
            post: {
                tags: ["register a user"],
                requestBody: {

                    content: {
                        "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "name of the user",
                                    example: "John Doe"
                                },
                                email: {
                                    type: "string",
                                    description: "email of the user",
                                    example: "johndoe@example.com"
                                },
                                password: {
                                    type: "string",
                                    description: "password of the user",
                                    example: "johnDoesTech"
                                },
                            },
                        }
                    }
                },
            },
                responses: {
                    201: {
                        description: "created"
                    }
                }
            }
        },
        "/api/user/login" : {
            post: {
                tags: ["login a user"],
                requestBody: {
                   content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                        description: "email of the user",
                                        example: "johndoe@example.com"
                                    },
                                    password: {
                                        type: "string",
                                        description: "password of the user",
                                        example: "johnDoesTech"
                                    },

                                }
                            }
                        }
                   } 
                },
                responses: {
                    200: {
                        description: "OK",
                    }
                }
            }
        },
        "/api/user/" : {
            get: {
                tags: ["Get loggined user"],
                put: {
                    security: [
                        {
                            "Bearer Token": []
                        }
                    ]
                },                
                responses: {
                    200:{
                        description: "OK",
                    }
                }
            }
        },
        "/api/user/{userId}/updateProfile" : {
            put: {
                tags: ["update a user (name and email)"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        description: "userId for updating profile",
                        type: "string",
                        example: "65168df48abc7a2c1cbf1e4a"
                    }
                ],
                requestBody: {
                   content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "name of the user that he wish to update",
                                        example: "john doe"
                                    },
                                    email: {
                                        type: "string",
                                        description: "email of the user that he wish to update",
                                        example: "johndoe@example.com"
                                    },

                                }
                            }
                        }
                   } 
                },
                responses: {
                    200: {
                        description: "OK",
                    }
                }
            }
        },
        "/api/user/{userId}/changePassword" : {
            patch: {
                tags: ["change a user password"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        description: "userId for updating profile",
                        type: "string",
                        example: "65168df48abc7a2c1cbf1e4a"
                    }
                ],
                requestBody: {
                   content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    currentPassword: {
                                        type: "string",
                                        description: "current password of the user",
                                        example: "johnDoesTech"
                                    },
                                    newPassword: {
                                        type: "string",
                                        description: "new password that the user wishes to update",
                                        example: "johnDoesTech"
                                    },
                                    confirmNewPassword: {
                                        type: "string",
                                        description: "confirm new password",
                                        example: "johnDoesTech"
                                    },

                                }
                            }
                        }
                   } 
                },
                responses: {
                    200: {
                        description: "OK",
                    }
                }
            }
        },
        "/api/todos/create": {
            post: {
                tags: ["create a todo"],
                requestBody: {

                    content: {
                        "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                text: {
                                    type: "string",
                                    description: "actual todo to be saved in the database",
                                    example: "complete documentation asap"
                                },
                            },
                        }
                    }
                },
            },
                responses: {
                    201: {
                        description: "created"
                    }
                }
            }
        },
        "/api/todos/all": {
            get: {
                tags: ["get all the todos crated by the loggined user"],
                responses: {
                    200: {
                        description: "OK",
                    }
                }
            }
        },
        "/api/todos/{todoId}/edit": {
            put: {
                tags: ["edit the todo with given id"],
                parameters: [
                    {
                        name: "todoId",
                        in: "path",
                        required: true,
                        description: "todoId for updating todo",
                        type: "string",
                        example: "651697491e4993658b9b4c95"
                    }
                ],
                requestBody: {
                    content: {
                         "application/json": {
                             schema: {
                                 type: "object",
                                 properties: {
                                     text: {
                                         type: "string",
                                         description: "text of the todo that user wish to update",
                                         example: "a todo to update"
                                     },
                                 }
                             }
                         }
                    } 
                 },
                responses: {
                    200: {
                        description: "OK",
                    }
                }
            }
        },
        "/api/todos/{todoId}/delete": {
            delete: {
                tags: ["delete the todo with given id"],
                parameters: [
                    {
                        name: "todoId",
                        in: "path",
                        required: true,
                        description: "todoId for updating todo",
                        type: "string",
                        example: "651697491e4993658b9b4c95"
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                    }
                }
            }
        },
        "/api/todos/get": {
            get: {
                tags: ["get todos by pagination"],
                description: "default pagination query params is set to page = 1 and perPage = 10 todos per page",
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        required: true,
                        description: "userId for updating profile",
                        type: "number",
                        example: 1
                    },
                    {
                        name: "perPage",
                        in: "query",
                        required: true,
                        description: "userId for updating profile",
                        type: "number",
                        example: 10
                    },
                ],
                responses: {
                    200: {
                        description: "OK",
                    }
                }
            }
        },
        "/api/anything": {
            get: {
                tags: ["404 page"],
                description: "wrong http methods or routes are handled by this endpoint",
                responses: {
                    404: {
                        description: "Not Found",
                    }
                }
            }
        },
    },
}