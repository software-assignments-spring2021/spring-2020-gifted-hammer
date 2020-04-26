const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

// mongoose trackSchema
const TracksSchema = new mongoose.Schema({
    locationCode: { type: String, required: true },
    events: { type: Array, required: true },
});
mongoose.model("Tracks", TracksSchema)
const Tracks = mongoose.model("Tracks")
mongoose.connect('mongodb+srv://giftedHammer:giftedHammer@cluster0-smurl.mongodb.net/spotilytics?retryWrites=true&w=majority', { useNewUrlParser: true });


// mongoose moodSchema
const moodsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    moods: { type: Array, required: true },
});
mongoose.model("Moods", moodsSchema)
const Moods = mongoose.model("Moods")
mongoose.connect('mongodb+srv://giftedHammer:giftedHammer@cluster0-smurl.mongodb.net/spotilytics?retryWrites=true&w=majority', { useNewUrlParser: true });

// mongoose topSongSchema
const topSongSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    song: { type: String, required: true },
});
mongoose.model("TopSong", topSongSchema)
const TopSong = mongoose.model("TopSong")
mongoose.connect('mongodb+srv://giftedHammer:giftedHammer@cluster0-smurl.mongodb.net/spotilytics?retryWrites=true&w=majority', { useNewUrlParser: true });

//how u create a entry
/*
const tracks = new Tracks({locationCode:"0000",data:{test:"blah!",testo:["spoo","bah"]})
tracks.save((err,saved,count)=>{
	console.log(saved)
});
*/