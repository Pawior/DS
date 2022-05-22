const tagsArray = [
    "#love",
    "#instagood",
    "#fashion",
    "#photooftheday",
    "#beautiful",
    "#art",
    "#photography",
    "#happy",
    "#picoftheday",
    "#cute",
    "#follow",
    "#tbt",
    "#followme",
    "#nature",
    "#like4like",
    "#travel",
    "#instagram",
    "#style",
    "#repost",
    "#summer",
    "#instadaily",
    "#selfie",
    "#me",
    "#friends",
    "#fitness",
    "#girl",
    "#food",
    "#fun",
    "#beauty",
    "#instalike",
    "#smile",
    "#family",
    "#photo",
    "#life",
    "#likeforlike",
    "#music",
    "#follow4follow",
    "#makeup",
    "#amazing",
    "#igers",
    "#nofilter",
    "#dog",
    "#model",
    "#sunset",
    "#beach",
    "#instamood",
    "#motivation",
]

let tagsObjArray = []
let id = 0

tagsArray.forEach(elem => {
    let objToPush = {
        "id": id,
        "name": elem,
        "popularity": Math.floor(Math.random() * 500)
    }
    id++
    tagsObjArray.push(objToPush)
})
module.exports = { tagsArray, tagsObjArray };