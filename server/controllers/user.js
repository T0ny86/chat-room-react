
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

const ROUNDS = 3    // small number just for testing now, and when deploy it to free hosting account, may use small resources

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const isUserExist = await User.findOne({ username })
        if (isUserExist) return res.json({ msg: "Username is already taken", status: false })

        const isEmailExist = await User.findOne({ email })
        if (isEmailExist) return res.json({ msg: "Email is already used", status: false })

        const hashedPassword = await bcrypt.hash(password, ROUNDS)
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        })

        delete user.password // delete password key from user object, before return the user 
        return res.json({ status: true, user })

    } catch (error) {
        res.json({ err: error })
    }


};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const fetchedUser = await User.findOne({ username })
        if (!fetchedUser) return res.json({ msg: "Incorrect username or password", status: false })

        const isPasswordValid = await bcrypt.compare(password, fetchedUser.password)
        if (!isPasswordValid) return res.json({ msg: "Incorrect username or password", status: false })

        delete fetchedUser.password
        return res.json({ status: true, user: fetchedUser })

    } catch (error) {
        return res.json({ err: error })
    }
}

export const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id
        const avatarImage = req.body.image
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        })
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select(
            "email", "username", "avatarImage", "_id"   // we don't want to return other fields like password and email
        )  // select all wanted fields except the current id, $ne => not equel

        return res.json(users)

    } catch (error) {
        next(error)
    }
}

export const logOut = (req, res, next) => {
    try {
        if (!req.params.id) return res.json({ msg: "User id is required " });
        onlineUsers.delete(req.params.id);
        return res.status(200).send();
    } catch (ex) {
        next(ex);
    }
};