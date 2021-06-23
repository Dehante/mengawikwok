let axios = require('axios')
let fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Cari apa?'
  let res = await axios.get('http://lolhuman.herokuapp.com/api/nhentai/'+text+'?apikey=NinoWangyy')
  let { title_romaji, title_native, info, image } = res.data.result
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
  let data = await fetch('http://lolhuman.herokuapp.com/api/nhentaipdf/'+text+'?apikey=NinoWangyy')
  let json = await data.json()
  conn.sendFile(m.chat, json.result, title_romaji.pdf, null, m, {asDocument: true, thumbnail: image[0]})
}
handler.help = ['nhentaipdf <query>']
handler.tags = ['downloader']
  
handler.command = /^nh(pdf|entaipdf)$/i

module.exports = handler
