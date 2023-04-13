

export const getDoc = (host:string)=>{

    return {
      "openapi": "3.0.0",
      "info": {
        "title": "BookFace Backend",
        "version": "0.1.9"
      },
      "servers": [
        {
          "url": `${host}`
        }
      ],
      "paths": {
        "/register": {
          "post": {
            "summary": "",
            "tags": [
              "Users"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "pwd": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "email",
                      "pwd"
                    ]
                  },
                  "example": {
                    "email": "test2@test.com",
                    "pwd": "test"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/login": {
          "post": {
            "summary": "",
            "tags": [
              "Users"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "pwd": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "email"
                    ]
                  },
                  "example": {
                    "email": "test2@test.com",
                    "pwd": "test"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/logout": {
          "post": {
            "summary": "",
            "tags": [
              "Users"
            ],
            "parameters": [
              {
                "in": "cookie",
                "name": "VATOKEN",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/addG": {
          "post": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "user_tag": {
                        "type": "string"
                      },
                      "group_tag": {
                        "type": "string"
                      },
                      "content": {
                        "type": "string"
                      },
                      "media": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "user_tag",
                      "group_tag",
                      "content"
                    ]
                  },
                  "example": {
                    "user_tag": "@user1",
                    "group_tag": "@TST-GP",
                    "content": "post content",
                    "media": 0
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/add": {
          "post": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "tag": {
                        "type": "string"
                      },
                      "content": {
                        "type": "string"
                      },
                      "media": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "tag",
                      "content"
                    ]
                  },
                  "example": {
                    "tag": "@user2",
                    "content": "post content"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/register": {
          "post": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "user_tag": {
                        "type": "string"
                      },
                      "posts_id": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "user_tag",
                      "posts_id"
                    ]
                  },
                  "example": {
                    "user_tag": "@user2",
                    "posts_id": 1
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/like": {
          "post": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "tag": {
                        "type": "string"
                      },
                      "context_id": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "tag",
                      "context_id"
                    ]
                  },
                  "example": {
                    "tag": "@user2",
                    "context_id": 1
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/comments/add": {
          "post": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "tag": {
                        "type": "string"
                      },
                      "content": {
                        "type": "string"
                      },
                      "posts_id": {
                        "type": "number"
                      },
                      "parent_comment": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "tag",
                      "content",
                      "posts_id"
                    ]
                  },
                  "example": {
                    "tag": "@user2",
                    "content": "simple comment",
                    "posts_id": 1,
                    "parent_comment": 1
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/comments/like": {
          "post": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "tag": {
                        "type": "string"
                      },
                      "context_id": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "tag",
                      "context_id"
                    ]
                  },
                  "example": {
                    "tag": "@user1",
                    "posts_id": 1
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/registered": {
          "get": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "parameters": [
              {
                "in": "query",
                "name": "user_tag",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/group": {
          "get": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "parameters": [
              {
                "in": "query",
                "name": "group_tag",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/public": {
          "get": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/posts/comment": {
          "get": {
            "summary": "",
            "tags": [
              "Posts"
            ],
            "parameters": [
              {
                "in": "query",
                "name": "post_id",
                "required": true,
                "schema": {
                  "type": "number"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "number"
                        },
                        "message": {
                          "type": "string"
                        },
                        "constent": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "tags": [
        {
          "name": "Users",
          "description": "User operations"
        },
        {
          "name": "Groups",
          "description": "Groups operations"
        },
        {
          "name": "Posts",
          "description": "Posts operations"
        },
        {
          "name": "Events",
          "description": "Events operations"
        }
      ]
    }

}