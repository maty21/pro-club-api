const Mixer = require('@mixer/client-node');

const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

const channelName = process.argv[2];

client.use(new Mixer.OAuthProvider(client, {
    clientId: '156c52605f61cbc3564d38a46ceb4106ab92bc02d0865bd6',
}));


const getResults = async () => {
    let viewers = [];
    try {
        const res = await client.request('GET', `channels/98340453/recordings`);
        viewers = res.body.map(v => ({ id: v.id, createdAt: v.createdAt, duration: v.duration }));
        console.log(`You have ${viewers} total views...`);
    } catch (error) {
        log.error(`cant get viewer results`)
    }

    return viewers;

}



module.exports = {
    getMixerResults: getResults
}