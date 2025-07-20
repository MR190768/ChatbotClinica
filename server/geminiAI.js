//Clase para manejar la conexión con la API de Gemini AI
const { GoogleGenAI } = require('@google/genai');

class GeminiAi {
    // Constructor que inicializa el cliente de Gemini AI con la clave API
    constructor() {
        this.API_KEY = process.env.API_KEY;
        if (!this.API_KEY) {
            console.error("Error: La clave API de Gemini no está configurada. Asegúrate de tener API_KEY_GEMINI en tu archivo .env");
        }
        this.genAI = new GoogleGenAI({ apiKey: this.API_KEY });

    }
    // Método para enviar un mensaje a Gemini AI y recibir una respuesta
    async askGemini(msg) {
        try {
            const result = await this.genAI.models.generateContent({
                model: "gemini-2.5-flash",
                contents: msg,
            });
            const response = await result.text;
            return response;
        }
        catch (error) {
            console.error('Error al comunicarse con la API de Gemini:', error);
            return "Lo siento, tuve un pequeño problema. Por favor, intenta de nuevo.";
        }
    }
}

module.exports = GeminiAi;