import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import FavoriteSong from "../../models/favorite-song.model"

// [GET] /favorite-songs/
export const index = async (req: Request, res: Response) => {
    try {
        const favoriteSongs = await FavoriteSong.find({
            // userId: "",
            deleted: false
        })

        for (const item of favoriteSongs) {
            const infoSong = await Song.findOne({
                _id: item.songId
            })

            const infoSinger = await Singer.findOne({
                _id: infoSong.singerId
            })

            item["infoSong"] = infoSong
            item["infoSinger"] = infoSinger
        }
    
        res.render("client/pages/favorite-songs/index", {
            pageTitle: "Bài hát yêu thích",
            favoriteSongs: favoriteSongs
        })
    } catch (error) {
        res.redirect("/topics")
    }
}

