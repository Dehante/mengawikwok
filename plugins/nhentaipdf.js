let axios = require('axios')

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Cari apa?'
  let res = await axios.get('http://lolhuman.herokuapp.com/api/nhentai/'+text+'?apikey=NinoWangyy')
  let data = await axios.get('http://lolhuman.herokuapp.com/api/nhentaipdf/'+text+'?apikey=NinoWangyy')
  let { title_romaji, title_native, info, image } = res.data.result
  let { pdfnya } = data.data.result
  let caption = `
${title_romaji}

${title_native}

Parodies : ${info.parodies}

Character : ${info.characters.join(", ")}

Tags : ${info.tags.join(", ")}

Artists : ${info.artists}

Groups : ${info.groups}

Languages : ${info.languages}

Categories : ${info.categories}

Pages : ${info.pages}

Uploaded : ${info.uploaded}
`
  conn.sendFile(m.chat, image[0], null, caption.trim(), m, false, {thumbnail: Buffer.alloc(0)})
  

  conn.sendFile(m.chat, pdfnya, title_romaji.pdf, null, m, {asDocument: true})
}
handler.help = ['nhentaipdf <query>']
handler.tags = ['downloader']
  
handler.command = /^nh(pdf|entaipdf)$/i

module.exports = handler
