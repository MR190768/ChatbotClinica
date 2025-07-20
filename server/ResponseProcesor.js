const GeminiAi = require('./geminiAI');
class ResponseProcesor {
    constructor() {
        this.geimini = new GeminiAi();
    }

    async responsePro(msg, ogMsg) {
        try {
            const message = JSON.parse(msg);

            switch (message.type) {
                case "askAI":
                    return await this.geimini.askGemini(ogMsg+message.text)
                    break;
                case "promtAI":
                    return await this.geimini.askGemini(msg)
                    break;
            }

        } catch (error) {
            return msg

        }

    }
}

module.exports= ResponseProcesor;