import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products',
      },
      {
        name: 'Users',
        description: 'API operations related to products',
      },
      {
        name: 'Auth',
        description: 'API operations related to products',
      },
    ],
    info: {
      title: 'REST API Node.js - Express - TypeScript - PostgreSQL',
      version: '1.0',
      description: 'API Docs for Products',
    },
  },
  //Endpoints to document
  apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
    content: url('https://res.cloudinary.com/dagqsktxx/image/upload/v1751926303/airflow-svgrepo-com_nq5ie1.svg');
    height: 3rem;
    width: auto;
    }
    .swagger-ui .topbar {
      background-color: #0068FF;
      height: 4rem;
    }
  `,
  customSiteTitle: 'Documentación REST API Express / TypeScript',
};

export default swaggerSpec;
export { swaggerUiOptions };
