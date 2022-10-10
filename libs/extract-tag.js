const hashtagRegExp = '[^\\#|.]+'
  const preceding     = '^|\\s'

  const txt = '(' + preceding + ')#(' + hashtagRegExp + ')'
  const reg = new RegExp("\#([^\#|.]+)", "ig") // new RegExp(txt, 'g');
  console.log('#这是个标签\n中文\n\nsdfsdf\n\ndsfsdf\n\n#abc #sdfsd'.replace(/\n/g, '  '))
  const rs = '#这是个标签\n中文\n\nsdfsdf\n\ndsfsdf\n\n#abc #sdfsd'.replace(/\n/g, '  ').match(reg)
  console.log(rs)

  const breaks = /^[\n\s\t\r]$/  // ['\n', '\r', '\s', '\t', ' ']
  function extract (text) {
    text += '\n'
    const tags = []
    let isTag = false
    const list = text.split('')
    let temp = ''
    list.forEach(w => {
      console.log(w)
      if (w === '#') {
        console.log('start tag')
        isTag = true
        temp = '#'
      } else if (breaks.test(w)) {
        console.log('break')
        isTag = false
        temp.includes('#') && tags.push(temp)
        temp = ''
      } else {
        console.log('word')
        temp += w
      }
    })
    return tags
  }
  
  extract(`#这是个标签\n中文\n\nsdfsdf\n\ndsfsdf\n\n#abc #sdfsd
  #中文 def #123 abc
  `)