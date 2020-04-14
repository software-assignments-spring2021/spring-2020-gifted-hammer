const EmotionFilters = {};

EmotionFilters['angry'] = {
    popularity: .5,
    tempo: .9,
    energy: .9,
    danceable: .4,
    vocals: .5,
    mood: 0
}

EmotionFilters['sad'] = {
    popularity: .7,
    tempo: .3,
    energy: .3,
    danceable: .1,
    vocals: .9,
    mood: 0
}

EmotionFilters['neutral'] = {
    popularity: .5,
    tempo: .5,
    energy: .5,
    danceable: .5,
    vocals: .5,
    mood: .5
}

EmotionFilters['disgust'] = {
    popularity: .5,
    tempo: .9,
    energy: .9,
    danceable: .4,
    vocals: .5,
    mood: 0
}
EmotionFilters['surprise'] = {
    popularity: .8,
    tempo: .9,
    energy: .9,
    danceable: .8,
    vocals: .5,
    mood: 1
}

EmotionFilters['fear'] = {
    popularity: .5,
    tempo: .9,
    energy: .9,
    danceable: .4,
    vocals: .5,
    mood: 1
}
EmotionFilters['happy'] = {
    popularity: .8,
    tempo: .9,
    energy: .9,
    danceable: .8,
    vocals: .5,
    mood: 1
}

export default EmotionFilters;
