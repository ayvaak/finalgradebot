const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const prefix = "#";

client.on("message", function(message) {
    //does not respond to bots
    if (message.author.bot) return; 
    //does not respond to commands not preceded with '#'
    if (!message.content.startsWith(prefix)) return; 

    //set up formatting
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    //write arrays
    //low final exam score needed
    var lessthan70 = 
        ['You got this.',
        'Easy!',
        'You can do that.',
        'Sweet.',
        'High five.',
        'Nice.',
        'No need to worry.',
        'You earned it.',
        'Aw yeah.',
        'You did it.']
    //high final exam score needed
    var morethan70 = 
        ['Stay safe out there.',
        'Hoo boy.',
        'I believe in you.',
        'Stay strong.',
        'Finish strong.',
        'You can do it!',
        'Good luck!',
        'Break a leg!',
        'Stay determined!',
        'The final stretch.']
    //should i study?
    var advice = 
        ['Yeah, probably. Just look over your notes maybe two more times and call it a night.',
        'No, go to sleep. Please. This is an intervention. Humans need sleep.',
        'I mean, you’re probably fine? But you have so much youtube in your search history that I’m concerned nonetheless.',
        'To be honest — yes. There’s a whole section you haven’t looked at yet. Stay focused, friend.',
        'Yes. If you took your final right now you’d pull a 33%. (That’s with the curve.)',
        'Yes! Look at your notes right now and you’ll absorb a last-minute piece of information that’s going to be on the exam! No, seriously.',
        'Nope, you’re stressing yourself out right now. Take a little walk. It’s beautiful out there.',
        'No, you look like you just fought God. Drink some water or something I don’t know.',
        'No no no what you need right now is a shower. I’m begging you, and I don’t even have a nose. Think of your roommates.',
        'Nah you’ve been working hard, and you’re in a good place right now. Eat a snack and get some rest, you’ve prepared enough.',
        'Yeah. You could’ve done more studying this entire semester, honestly.',
        'Yes. Sorry, but you haven’t absorbed any new information in the past hour you’ve been ~studying~.',
        'It’s up to you and your mental state right now. Are you up for more? Then do, it’ll help. If you aren’t, it will only hurt you.',
        'Actually, you don’t really need to. It won’t hurt, but you know this stuff like second nature at this point.',
        'No! Listen to some music and take a nap. But probably do one last comprehensive review before the hour of judgement.',
        'No, whatever you do now won’t change your outcome. Don’t worry. Just breathe.']

    //listen for commands
    switch(command) {
        
        case('finalgradehelp'):
            
            //gives information on how to use bot
            message.reply('Hi, I’m FinalGradeBot! What can I do for you?' +
                '\n\n#scoreneeded will calculate what you need on a final for your desired overall grade.' +
                '\nFormat: #scoreneeded currentclassgrade desiredclassgrade examweight' +
                '\n\n#scorereceived will calculate what your overall class grade is, given your current grade and score on your final.' +
                '\nFormat: #scorereceived currentclassgrade examscore examweight' +
                '\n\n#shouldistudy will give you my personal opinion on if you’ve studied enough or not. I hold no liability, so I don’t need scores for this one. I will judge your soul.' +
                '\nFormat: #shouldistudy');
        break;

        case('scoreneeded'):
            
            //calculates final exam score needed for a desired overall grade
            //three input arguments
            var currentclassgrade = args[0]
            var desiredclassgrade = args[1]
            var examweightpercent = args[2]
            
            //perform calculation
            var classweightpercent = 100 - examweightpercent
            var scoreneeded = (desiredclassgrade - (classweightpercent * 0.01)*(currentclassgrade))/(examweightpercent * 0.01)
            
            //round
            scoreneeded = Math.round(scoreneeded * 1000) / 1000
            
            //generate statement
            var statement = "";
            if (scoreneeded < 0) {
                //too low...
                statement = "Uh... hm. You can aim a little higher."
            } else if (scoreneeded < 70) {
                //random number generator
                var random = (Math.floor(Math.random() * Math.floor(10)))
                statement = lessthan70[random]
            } else if (scoreneeded <= 100) {
                //random number generator
                var random = (Math.floor(Math.random() * Math.floor(10)))
                statement = morethan70[random]
            } else {
                //more than 100, too high...
                statement = "Uh... hm. You might have to aim a little lower."
            }
            
            //output
            message.reply('If you have an overall ' + currentclassgrade + '% in your class right now, ' +
                'you want at least an overall ' + desiredclassgrade + 
                '%, and your exam is weighted ' + examweightpercent + '%, then you need to score...')
            message.reply('...a ' + scoreneeded + '% on your exam. ' + statement)
        break;

        case('scorereceived'):
            
            //calculates final overall grade given final exam score
            //three input arguments
            var currentclassgrade = args[0]
            var examscorepercent = args[1]
            var examweightpercent = args[2]
            
            //perform calculation
            var classweightpercent = 100 - examweightpercent
            var finalgrade = (classweightpercent * 0.01)*(currentclassgrade) + (examweightpercent * 0.01)*(examscorepercent)
            
            //round
            finalgrade = Math.round(finalgrade * 1000) /1000
            
            //output
            message.reply('If you have an overall ' + currentclassgrade + '% in your class right now, ' +
                'you received a ' + examscorepercent + '% on your exam, ' +
                'and your exam is weighted ' + examweightpercent + '%, then...')
            message.reply('...your final grade in this class is a ' + finalgrade + '%. Nice!')
        break;

        case('shouldistudy'):
            
            //random number generator
            var random = (Math.floor(Math.random() * Math.floor(16)))
            
            //output
            message.reply('Should you study? ' + advice[random])
        break;

    } //no other commands
});

client.login(config.BOT_TOKEN);