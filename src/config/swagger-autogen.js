import swaggerAutogen from 'swagger-autogen'

const doc = { 
    info: {
        title: 'Proyecto Final' , 
        descripcion: 'Blog'
    },
    host: 'localhost:3000'
}

const outputFile = './swagger-output.jason'
const routes = ['./src/index.js']

swaggerAutogen ()(outputFile, routes, doc)