const axios = require('axios');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kpop",
    description: "KPop stuff.",
    async execute(message) {
        //Split the user's message to retrieve variables
        input = message.content.split(" ");

        //Annoying conditional logic so I can be lazy and put this all in one command
        var sortBy = "Stage";
        if(input[1] === "boy-groups" || input[1] === "girls-groups"){
            sortBy = "Group"
        }
        if(input[1] == "songs"){
            sortBy = "Song"
        }

        var options = {
            method: 'GET',
            url: `https://k-pop.p.rapidapi.com/${input[1]}/${input[2]}`,
            headers: {
              'X-RapidAPI-Key': '1e3e2aeac8msh0ea5e80f95fbe5bp19533cjsnec96e2cbbbee',
              'X-RapidAPI-Host': 'k-pop.p.rapidapi.com'
            },
            responseType: 'json'
          }; 

        //If the user is searching for a specific idol/song we need to pass in parameters
        if(input[2] !== "random"){
            options = {
                method: 'GET',
                url: `https://k-pop.p.rapidapi.com/${input[1]}`,
                params: {
                    q: `${input[2]}`,
                    by: `${sortBy} Name`
                  },
                headers: {
                  'X-RapidAPI-Key': '1e3e2aeac8msh0ea5e80f95fbe5bp19533cjsnec96e2cbbbee',
                  'X-RapidAPI-Host': 'k-pop.p.rapidapi.com'
                },
              };
        }
          
          try {
              const response = await axios.request(options);
              const data = response.data;
              //Generate a random color for the pretty embed uwu
              var randomColor = Math.floor(Math.random()*16777215).toString(16);
              //Different query options available with the API, choose the correct option based on user input
              switch(input[1]) {
                case "idols":
                    //We do a bit of ternary flexing
                    var gender = (data.data[0]["Gender"] == "M") ? "Male" : "Female";
                    var profile = "";
                    if(data.data[0]["Profile"] !== null){
                        profile = `Profile: ${data.data[0]["Profile"]}`;
                    }
                    //Create and format the shiny embedded discord message
                    const embed = new MessageEmbed()
                    .setDescription(`${profile}\n
                                     Full Name: ${data.data[0]["Full Name"]}\n
                                     Korean Name: ${data.data[0]["Korean Name"]}\n
                                     Korean Stage Name: ${data.data[0]["K. Stage Name"]}\n
                                     Date of Birth: ${data.data[0]["Date of Birth"]}\n
                                     Height: ${data.data[0]["Height"]}\n
                                     Weight: ${data.data[0]["Weight"]}\n
                                     Birthplace: ${data.data[0]["Birthplace"]}\n
                                     Gender: ${gender}`)
                    .setTitle(data.data[0]["Stage Name"])
                    .setColor(randomColor)

                    await message.channel.send(embed);
                  break;
                case "boy-groups":
                    message.channel.send(":)")
                  break;
                case "girl-groups":
                    message.channel.send(":)")
                break;
                case "songs":
                    const songEmbed = new MessageEmbed()
                    .setDescription(data.data[0]["Video"])
                    .setTitle(`${data.data[0]["Song Name"]} | ${data.data[0]["Korean Name"]}`)
                    .setColor(randomColor)
                    .setFooter(`${data.data[0]["Artist"]}, ${data.data[0]["Date"]}`)
                    .setThumbnail("https://i.imgur.com/GO8ZDEP.gif")

                    await message.channel.send(songEmbed);
                break;
                default:
                    message.channel.send("Usage: ;kpop <idols|boy-groups|girl-groups|songs> <query|random>");
              } 
              
          } catch (error) {
              message.channel.send("error!");
              message.channel.send("Usage: ;kpop <idols|boy-groups|girl-groups|songs> <query|random>");
          }
    },
  };