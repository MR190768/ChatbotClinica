// Clase para manejar conxion con DaialogFlow ES
const { SessionsClient } = require('@google-cloud/dialogflow'); 

class DfConn { 
    // Constructor que inicializa el cliente de Dialogflow con las credenciales y la session
    constructor(id) {
        const projectId = process.env.DIALOGFLOW_PROJECT_ID;
        this.languageCode ="es";

        const clientOptions = {};
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
            clientOptions.credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH) {
            clientOptions.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH;
        } else {
            console.warn("ADVERTENCIA: No se han proporcionado credenciales para Dialogflow ES. Asegúrate de que GOOGLE_APPLICATION_CREDENTIALS esté configurada o usa variables de entorno para las credenciales.");
        }
        this.client = new SessionsClient(clientOptions); 
        this.sessionPath = this.client.projectAgentSessionPath(projectId, id); 
    }

    // Método para enviar un mensaje a Dialogflow y recibir una respuesta
    async askDf(message) {
        try {
            const request = {
                session: this.sessionPath,
                queryInput: {
                    text: {
                        text: message,
                        languageCode: this.languageCode,
                    },
                },
            };
            console.log('DEBUG: Request object being sent to Dialogflow:', JSON.stringify(request, null, 2));

            const [response] = await this.client.detectIntent(request);
            console.log('Respuesta de Dialogflow ES:', JSON.stringify(response, null, 2));

            
            const botResponse = response.queryResult.fulfillmentText; 

            return botResponse;

        } catch (error) {
            console.error('Error al detectar la intención de Dialogflow ES:', error);
            return "Lo siento, no pude entender tu mensaje. Por favor, intenta de nuevo.";
        }
    }
}

module.exports = DfConn;