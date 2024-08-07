const { OpenAI } = require("openai");
require('dotenv').config()

const generateMedicineDescription = async (medicineName) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.completions.create({
      messages: [{role: "system", content: `buat deskripsi untuk obat ${medicineName}. dan jelaskan cara pemakaiannya` }],
      model: "gpt-3.5-turbo",
    });

    const description =  completion.choices[0].messages.content.trim();
    return description

  } catch (error) {
    console.error('Error in OpenAI helper:', error);
    return null;
  }
};

module.exports = {
  generateMedicineDescription,
};
