import express from 'express';
import { swaggerDocs } from './config/swagger.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import categoryRoutes from './routes/category.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT || 3000; // Definir el puerto aquí

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);
app.use(categoryRoutes);
app.use(commentsRoutes);

const swaggerDocument = YAML.load('./docs/openapi.yaml');

// Middleware para servir la documentación de OpenAPI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
