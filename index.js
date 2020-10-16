const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
require("moment-duration-format");
const momenttz = require('moment-timezone');
const MessageAdd = require('./db/message_add.js')
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '무언가를' }, status: 'online' })

  let state_list = [
    '심심함',
    '말거지마',
    '에베베베베',
    '메렁메렁',
  ]
  let state_list_index = 1;
  let change_delay = 3000; // 이건 초입니당. 1000이 1초입니당.

  function changeState() {
    setTimeout(() => {
      console.log( '상태 변경 -> ', state_list[state_list_index] );
      client.user.setPresence({ game: { name: state_list[state_list_index] }, status: 'online' })
      state_list_index += 1;
      if(state_list_index >= state_list.length) {
        state_list_index = 0;
      }
      changeState()
    }, change_delay);
  }

  changeState();
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on("messageUpdate", (message) => {
  MessageSave(message, true)
});

client.on('message', (message) => {
  MessageSave(message)
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('``5ms``미만입니다.');
  }

  if(message.content == '문아') {
    return message.reply('왜불러 (**귀찮아**)');
  }

  if(message.content == '문아 사귀자') {
    return message.reply('저리가..');
  }

  if(message.content == '문아 안녕') {
    return message.reply('ㅎㅇ');
  }

  if(message.content == '문아 섹스') {
    return message.reply('위에 친거 스퀘어지? ㅉㅉ');
  }

  if(message.content == '문아 돈줘') {
    return message.reply('그지새끼 ㅋㅋ');
  }

  if(message.content == '문아 돈주라') {
    return message.reply('그지새끼 ㅋㅋ');
  }

  if(message.content == '문아 놀아줘') {
    return message.reply('크시갖고놀아 ㅡㅡ');
  }

  if(message.content == '문아 시발') {
    return message.reply('***봇한테 욕하는 니인생 ㄹㅈㄷ***');
  }

  if(message.content == '문아 개새끼야') {
    return message.reply('저리가..');
  }

  if(message.content == '문아 자위') {
    return message.reply('ㅡㅡ:tired_face: ');
  }

  if(message.content == '문아 지금 몇시야') {
    return message.reply('너가 시계봐');
  }

  if(message.content == '문아 ㅈㄹ') {
    return message.reply('ㅈㄹㄴ');
  }

  if(message.content == '크시야') {
    return message.reply('크시 없는뎅 ㅋㅋㅋ');
  }

  if(message.content == '문아 뒤져') {
    return message.reply('**너나뒤져**');
  }

  if(message.content == '문아 나가') {
    return message.reply('너나 나가');
  }
  
  if(message.content == 'ㅜㅜ') {
    return message.reply('우냐?울어?우네ㅋㅋ울지마');
  }

  if(message.content == 'ㅠㅠ') {
    return message.reply('우냐?울어?우네ㅋㅋ울지마');
  }

  if(message.content == '!청소 99') {
    return message.reply('*청소하지마아ㅏㅏ');
  }

  if(message.content == '문아 롤하자') {
    return message.reply('**너 개못하잖아**');
  }

  if(message.content == '문아 옵치하자') {
    return message.reply('티어 ㅇㄷ?');
  }

  if(message.content == '문아 못생겼어') {
    return message.reply('**거울봐**');
  }

  if(message.content == '문아 날씨') {
    return message.reply('너가 검색해 ㅡㅡ');
  }

  if(message.content == 'ㅠ') {
    return message.reply('우냐?울어?우네ㅋㅋ울지마');
  }

  if(message.content == 'ㅜ') {
    return message.reply('우냐?울어?우네ㅋㅋ울지마');
  }

if(message.content == '문아 문이봇초대') {
    return message.reply('https://discord.com/api/oauth2/authorize?client_id=755265826310979625&permissions=8&scope=bot');
  }

  if(message.content == '문아 서버') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/743290149361811529/7502723115ㅁ0788510/1515151.gif';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#00ffff')
    embed.setAuthor('서버정보 By ! MOON', img)
    embed.setFooter(`! MOON`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  if(message.content == '문아 엠베드') {
    let img = 'https://cdn.discordapp.com/attachments/743290149361811529/750272311520788510/1515151.gif';
    let embed = new Discord.RichEmbed()
      .setTitle('타이틀')
      .setURL('http://www.naver.com')
      .setAuthor('! MOON', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('Inline field title', 'Some value here')
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here1\nSome value here2\nSome value here3\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Made By ! MOON', img)

    message.channel.send(embed)

    
  } else if(message.content == '문아 도움말') {
    let helpImg = 'https://cdn.discordapp.com/attachments/763603688476377088/766481577172795452/G3c1.gif';
    let commandList = [
      {name: '문아 도움말', desc: '문이봇 도움말 표시'},
      {name: 'ping', desc: '봇테스트'},
      {name: '문아 엠베드', desc: 'embed 예제1'},
      {name: '문아 공지보내', desc: '전체공지'},
      {name: '!청소', desc: '텍스트 지움'},
      {name: '문아 초대코드', desc: '해당 채널의 초대 코드 표기'},
      {name: '문아 문이봇 초대코드', desc: '문이봇 초대코드'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('도움말 ^^', helpImg)
      .setColor('#00ffff')
      .setFooter(`문이봇`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!초대코드2') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content == '문아 초대코드') {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('문아 공지보내')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('문아 공지보내'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('대충 공지')
        .setColor('#00ffff')
        .setFooter(`문이봇`)
        .setTimestamp()
  
      embed.addField('대충할말: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지전송 완료 ^^~');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('문아 청소해')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('문아 청소해'.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지 숫자만 가능함ㅇㅇ")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

function getEmbedFields(message, modify=false) {
  if(message.content == '' && message.embeds.length > 0) {
    let e = message.embeds[0].fields;
    let a = [];

    for(let i=0;i<e.length;i++) {
        a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
    }

    return a.join('');
  } else if(modify) {
    return message.author.lastMessage.content;
  } else {
    return message.content;
  }
}

function MessageSave(message, modify=false) {
  imgs = []
  if (message.attachments.array().length > 0) {
    message.attachments.array().forEach(x => {
      imgs.push(x.url+'\n')
    });
  }

  username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/ugi)
  channelName = message.channel.type != 'dm' ? message.channel.name : ''
  try {
    username = username.length > 1 ? username.join('') : username
  } catch (error) {}

  try {
    channelName = channelName.length > 1 ? channelName.join('') : channelName
  } catch (error) {}

  var s = {
    ChannelType: message.channel.type,
    ChannelId: message.channel.type != 'dm' ? message.channel.id : '',
    ChannelName: channelName,
    GuildId: message.channel.type != 'dm' ? message.channel.guild.id : '',
    GuildName: message.channel.type != 'dm' ? message.channel.guild.name : '',
    Message: getEmbedFields(message, modify),
    AuthorId: message.author.id,
    AuthorUsername: username + '#' + message.author.discriminator,
    AuthorBot: Number(message.author.bot),
    Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
    CreateTime: momenttz().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')
  }

  s.Message = (modify ? '[수정됨] ' : '') + imgs.join('') + s.Message

  MessageAdd(
    s.ChannelType,
    s.ChannelId,
    s.ChannelName,
    s.GuildId,
    s.GuildName,
    s.Message,
    s.AuthorId,
    s.AuthorUsername,
    s.AuthorBot,
    s.Embed,
    s.CreateTime,
  )
    // .then((res) => {
    //   console.log('db 저장을 했다.', res);
    // })
    .catch(error => console.log(error))
}


client.login(token);