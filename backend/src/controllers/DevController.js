const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude  } = req.body;
        
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = response.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return res.json(dev);
    },

    async update(req, res){
        const { github_username } = req.params;
        const { longitude, latitude, bio, techs } = req.body;
        
        const modification = await Dev.updateOne(
            { github_username }, 
            {
                bio,
                techs: parseStringAsArray(techs),
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }
        );
        
        if (modification.nModified === 0) {
            return res.status(404).json({error: 'Dev not found'});
        }

        return res.json(await Dev.findOne({ github_username }));
    },

    async destroy(req, res){
        const { github_username } = req.params;

        const dev = await Dev.findOneAndDelete({ github_username });
        
        if (dev === null) {
            res.status(404).json({"error": "Dev not Found"});
        } else {
            res.json(dev);
        }
    },

    async show(req, res) {
        const { github_username } = req.params;

        const dev = await Dev.findOne({ github_username });

        if (dev === null) {
            res.status(404).json({"error": "Dev not found"});
        } else {
            res.json(dev);
        }
    }
}
