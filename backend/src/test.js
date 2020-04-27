const db = require('./db');
const mongoose = require('mongoose');
const Tracks = mongoose.model('Tracks');
const Moods = mongoose.model('Moods');
const logic = require('./logic.js')

const upload = async (locationCode, data) => {
    const tracks = new Tracks({ locationCode: locationCode, data: data })
    let res = await tracks.save()
    console.log(res)
    return res
}
const find = async (locationCode) => {
    let res = await Tracks.find({ "locationCode": locationCode })
    console.log(`found ${res.length} entry`)
    return res
}
const update =  async (userId, mood) => {
    const res = await logic.updateMoods (userId, mood)
    console.log(res)
}

const topSong = async (userId, topSongInput) => {
    const res = await logic.uploadTopSong(userId,topSongInput)
    console.log(res)
}
//upload()
//update('holy3214', .312312)
topSong('angelayu16', [['Some', "https://i.scdn.co/image/ab67616d0000b2732d73b1bb77cee09f0278be04"], ['With Us', "https://i.scdn.co/image/ab67616d0000b2732d73b1bb77cee09f0278be04"], ['Still Fighting', "https://i.scdn.co/image/ab67616d0000b2732d73b1bb77cee09f0278be04"]])